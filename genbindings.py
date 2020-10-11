#!/usr/bin/env python3
import sys, re

if len(sys.argv) != 6:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output.java /path/to/bindings/enums/ /path/to/bindings/output.c debug")
    print("debug should be true or false and indicates whether to track allocations and ensure we don't leak")
    sys.exit(1)

class TypeInfo:
    def __init__(self, rust_obj, java_ty, java_fn_ty_arg, c_ty, passed_as_ptr, is_ptr, var_name, arr_len, arr_access):
        self.rust_obj = rust_obj
        self.java_ty = java_ty
        self.java_fn_ty_arg = java_fn_ty_arg
        self.c_ty = c_ty
        self.passed_as_ptr = passed_as_ptr
        self.is_ptr = is_ptr
        self.var_name = var_name
        self.arr_len = arr_len
        self.arr_access = arr_access

class ConvInfo:
    def __init__(self, ty_info, arg_name, arg_conv, arg_conv_name, ret_conv, ret_conv_name):
        assert(ty_info.c_ty is not None)
        assert(ty_info.java_ty is not None)
        assert(arg_name is not None)
        self.c_ty = ty_info.c_ty
        self.java_ty = ty_info.java_ty
        self.java_fn_ty_arg = ty_info.java_fn_ty_arg
        self.arg_name = arg_name
        self.arg_conv = arg_conv
        self.arg_conv_name = arg_conv_name
        self.ret_conv = ret_conv
        self.ret_conv_name = ret_conv_name

    def print_ty(self):
        out_c.write(self.c_ty)
        out_java.write(self.java_ty)

    def print_name(self):
        if self.arg_name != "":
            out_java.write(" " + self.arg_name)
            out_c.write(" " + self.arg_name)
        else:
            out_java.write(" arg")
            out_c.write(" arg")

with open(sys.argv[1]) as in_h, open(sys.argv[2], "w") as out_java, open(sys.argv[4], "w") as out_c:
    opaque_structs = set()
    trait_structs = set()
    unitary_enums = set()

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

    var_is_arr_regex = re.compile("\(\*([A-za-z0-9_]*)\)\[([0-9]*)\]")
    var_ty_regex = re.compile("([A-za-z_0-9]*)(.*)")
    def java_c_types(fn_arg, ret_arr_len):
        fn_arg = fn_arg.strip()
        if fn_arg.startswith("MUST_USE_RES "):
            fn_arg = fn_arg[13:]
        is_const = False
        if fn_arg.startswith("const "):
            fn_arg = fn_arg[6:]
            is_const = True

        is_ptr = False
        take_by_ptr = False
        rust_obj = None
        arr_access = None
        if fn_arg.startswith("LDKThirtyTwoBytes"):
            fn_arg = "uint8_t (*" + fn_arg[18:] + ")[32]"
            assert var_is_arr_regex.match(fn_arg[8:])
            rust_obj = "LDKThirtyTwoBytes"
            arr_access = "data"
        if fn_arg.startswith("LDKPublicKey"):
            fn_arg = "uint8_t (*" + fn_arg[13:] + ")[33]"
            assert var_is_arr_regex.match(fn_arg[8:])
            rust_obj = "LDKPublicKey"
            arr_access = "compressed_form"
        #if fn_arg.startswith("LDKSignature"):
        #    fn_arg = "uint8_t (*" + fn_arg[13:] + ")[64]"
        #    assert var_is_arr_regex.match(fn_arg[8:])
        #    rust_obj = "LDKSignature"

        if fn_arg.startswith("void"):
            java_ty = "void"
            c_ty = "void"
            fn_ty_arg = "V"
            fn_arg = fn_arg[4:].strip()
        elif fn_arg.startswith("bool"):
            java_ty = "boolean"
            c_ty = "jboolean"
            fn_ty_arg = "Z"
            fn_arg = fn_arg[4:].strip()
        elif fn_arg.startswith("uint8_t"):
            java_ty = "byte"
            c_ty = "jbyte"
            fn_ty_arg = "B"
            fn_arg = fn_arg[7:].strip()
        elif fn_arg.startswith("uint16_t"):
            java_ty = "short"
            c_ty = "jshort"
            fn_ty_arg = "S"
            fn_arg = fn_arg[8:].strip()
        elif fn_arg.startswith("uint32_t"):
            java_ty = "int"
            c_ty = "jint"
            fn_ty_arg = "I"
            fn_arg = fn_arg[8:].strip()
        elif fn_arg.startswith("uint64_t") or fn_arg.startswith("uintptr_t"):
            java_ty = "long"
            c_ty = "jlong"
            fn_ty_arg = "J"
            if fn_arg.startswith("uint64_t"):
                fn_arg = fn_arg[8:].strip()
            else:
                fn_arg = fn_arg[9:].strip()
        elif is_const and fn_arg.startswith("char *"):
            java_ty = "String"
            c_ty = "const char*"
            fn_ty_arg = "Ljava/lang/String;"
            fn_arg = fn_arg[6:].strip()
        else:
            ma = var_ty_regex.match(fn_arg)
            if ma.group(1).strip() in unitary_enums:
                java_ty = ma.group(1).strip()
                c_ty = "jclass"
                fn_ty_arg = "Lorg/ldk/enums/" + ma.group(1).strip() + ";"
                fn_arg = ma.group(2).strip()
                rust_obj = ma.group(1).strip()
                take_by_ptr = True
            else:
                java_ty = "long"
                c_ty = "jlong"
                fn_ty_arg = "J"
                fn_arg = ma.group(2).strip()
                rust_obj = ma.group(1).strip()
                take_by_ptr = True

        if fn_arg.startswith(" *") or fn_arg.startswith("*"):
            fn_arg = fn_arg.replace("*", "").strip()
            is_ptr = True
            c_ty = "jlong"
            java_ty = "long"
            fn_ty_arg = "J"

        var_is_arr = var_is_arr_regex.match(fn_arg)
        if var_is_arr is not None or ret_arr_len is not None:
            assert(not take_by_ptr)
            assert(not is_ptr)
            java_ty = java_ty + "[]"
            c_ty = c_ty + "Array"
            if var_is_arr is not None:
                if var_is_arr.group(1) == "":
                    return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty,
                        passed_as_ptr=False, is_ptr=False, var_name="arg", arr_len=var_is_arr.group(2), arr_access=arr_access)
                return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_fn_ty_arg="[" + fn_ty_arg, c_ty=c_ty,
                    passed_as_ptr=False, is_ptr=False, var_name=var_is_arr.group(1), arr_len=var_is_arr.group(2), arr_access=arr_access)
        return TypeInfo(rust_obj=rust_obj, java_ty=java_ty, java_fn_ty_arg=fn_ty_arg, c_ty=c_ty, passed_as_ptr=is_ptr or take_by_ptr,
            is_ptr=is_ptr, var_name=fn_arg, arr_len=None, arr_access=None)

    def map_type(fn_arg, print_void, ret_arr_len, is_free):
        ty_info = java_c_types(fn_arg, ret_arr_len)

        if ty_info.c_ty == "void":
            if not print_void:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None, ret_conv = None, ret_conv_name = None)

        if ty_info.c_ty.endswith("Array"):
            arr_len = ty_info.arr_len
            if arr_len is not None:
                arr_name = ty_info.var_name
            else:
                arr_name = "ret"
                arr_len = ret_arr_len
            assert(ty_info.c_ty == "jbyteArray")
            if ty_info.rust_obj is not None:
                arg_conv = ty_info.rust_obj + " " + arr_name + "_ref;\n" + "(*_env)->GetByteArrayRegion (_env, " + arr_name + ", 0, " + arr_len + ", " + arr_name + "_ref." + ty_info.arr_access + ");"
                arr_access = ("", "." + ty_info.arr_access)
            else:
                arg_conv = "unsigned char " + arr_name + "_arr[" + arr_len + "];\n" + "(*_env)->GetByteArrayRegion (_env, " + arr_name + ", 0, " + arr_len + ", " + arr_name + "_arr);\n" + "unsigned char (*" + arr_name + "_ref)[" + arr_len + "] = &" + arr_name + "_arr;"
                arr_access = ("*", "")
            return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                arg_conv = arg_conv,
                arg_conv_name = arr_name + "_ref",
                ret_conv = ("jbyteArray " + arr_name + "_arr = (*_env)->NewByteArray(_env, " + arr_len + ");\n" +
                    "(*_env)->SetByteArrayRegion(_env, " + arr_name + "_arr, 0, " + arr_len + ", " + arr_access[0],
                    arr_access[1] + ");"),
                ret_conv_name = arr_name + "_arr")
        elif ty_info.var_name != "":
            # If we have a parameter name, print it (noting that it may indicate its a pointer)
            if ty_info.rust_obj is not None:
                assert(ty_info.passed_as_ptr)
                opaque_arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv;\n"
                opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.inner = (void*)(" + ty_info.var_name + " & (~1));\n"
                opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.is_owned = (" + ty_info.var_name + " & 1) || (" + ty_info.var_name + " == 0);"
                if not ty_info.is_ptr:
                    if ty_info.rust_obj in unitary_enums:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv = " + ty_info.rust_obj + "_from_java(_env, " + ty_info.var_name + ");",
                            arg_conv_name = ty_info.var_name + "_conv",
                            ret_conv = ("jclass " + ty_info.var_name + "_conv = " + ty_info.rust_obj + "_to_java(_env, ", ");"),
                            ret_conv_name = ty_info.var_name + "_conv")
                    if ty_info.rust_obj in opaque_structs:
                        ret_conv_suf = ";\nDO_ASSERT((((long)" + ty_info.var_name + "_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.\n"
                        ret_conv_suf = ret_conv_suf + "DO_ASSERT((((long)&" + ty_info.var_name + "_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.\n"
                        ret_conv_suf = ret_conv_suf + "long " + ty_info.var_name + "_ref;\n"
                        ret_conv_suf = ret_conv_suf + "if (" + ty_info.var_name + "_var.is_owned) {\n"
                        ret_conv_suf = ret_conv_suf + "\t" + ty_info.var_name + "_ref = (long)" + ty_info.var_name + "_var.inner | 1;\n"
                        ret_conv_suf = ret_conv_suf + "} else {\n"
                        ret_conv_suf = ret_conv_suf + "\t" + ty_info.var_name + "_ref = (long)&" + ty_info.var_name + "_var;\n"
                        ret_conv_suf = ret_conv_suf + "}"
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = opaque_arg_conv, arg_conv_name = ty_info.var_name + "_conv",
                            ret_conv = (ty_info.rust_obj + " " + ty_info.var_name + "_var = ", ret_conv_suf),
                            ret_conv_name = ty_info.var_name + "_ref")
                    base_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv = *(" + ty_info.rust_obj + "*)" + ty_info.var_name + ";";
                    if ty_info.rust_obj in trait_structs:
                        if not is_free:
                            base_conv = base_conv + "\nif (" + ty_info.var_name + "_conv.free == " + ty_info.rust_obj + "_JCalls_free) {\n"
                            base_conv = base_conv + "\t// If this_arg is a JCalls struct, then we need to increment the refcnt in it.\n"
                            base_conv = base_conv + "\t" + ty_info.rust_obj + "_JCalls_clone(" + ty_info.var_name + "_conv.this_arg);\n}"
                        else:
                            base_conv = base_conv + "\n" + "FREE((void*)" + ty_info.var_name + ");"
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = base_conv,
                            arg_conv_name = ty_info.var_name + "_conv",
                            ret_conv = ("CANT PASS TRAIT TO Java?", ""), ret_conv_name = "NO CONV POSSIBLE")
                    if ty_info.rust_obj != "LDKu8slice":
                        # Don't bother free'ing slices passed in - Rust doesn't auto-free the
                        # underlying unlike Vecs, and it gives Java more freedom.
                        base_conv = base_conv + "\nFREE((void*)" + ty_info.var_name + ");";
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv",
                        ret_conv = ("long " + ty_info.var_name + "_ref = (long)&", ";"), ret_conv_name = ty_info.var_name + "_ref")
                else:
                    assert(not is_free)
                    if ty_info.rust_obj in opaque_structs:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = opaque_arg_conv, arg_conv_name = "&" + ty_info.var_name + "_conv",
                            ret_conv = None, ret_conv_name = None) # its a pointer, no conv needed
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + ";",
                        arg_conv_name = ty_info.var_name + "_conv",
                        ret_conv = None, ret_conv_name = None) # its a pointer, no conv needed
            elif ty_info.is_ptr:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = ty_info.var_name, ret_conv = None, ret_conv_name = None)
            elif ty_info.java_ty == "String":
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None,
                    ret_conv = ("jstring " + ty_info.var_name + "_conv = (*_env)->NewStringUTF(_env, ", ");"), ret_conv_name = ty_info.var_name + "_conv")
            else:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = ty_info.var_name, ret_conv = None, ret_conv_name = None)
        elif not print_void:
            # We don't have a parameter name, and want one, just call it arg
            if ty_info.rust_obj is not None:
                assert(not is_free or ty_info.rust_obj not in opaque_structs);
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = ty_info.rust_obj + " arg_conv = *(" + ty_info.rust_obj + "*)arg;\nFREE((void*)arg);",
                    arg_conv_name = "arg_conv",
                    ret_conv = None, ret_conv_name = None)
            else:
                assert(not is_free)
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = "arg", ret_conv = None, ret_conv_name = None)
        else:
            # We don't have a parameter name, and don't want one (cause we're returning)
            if ty_info.rust_obj is not None:
                if not ty_info.is_ptr:
                    if ty_info.rust_obj in unitary_enums:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = ty_info.rust_obj + " ret = " + ty_info.rust_obj + "_from_java(_env, " + ty_info.var_name + ");",
                            arg_conv_name = "ret",
                            ret_conv = ("jclass ret = " + ty_info.rust_obj + "_to_java(_env, ", ");"), ret_conv_name = "ret")
                    if ty_info.rust_obj in opaque_structs:
                        # If we're returning a newly-allocated struct, we don't want Rust to ever
                        # free, instead relying on the Java GC to lose the ref. We undo this in
                        # any _free function.
                        # To avoid any issues, we first assert that the incoming object is non-ref.
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            ret_conv = (ty_info.rust_obj + " ret = ", ";"),
                            ret_conv_name = "((long)ret.inner) | (ret.is_owned ? 1 : 0)",
                            arg_conv = None, arg_conv_name = None)
                    else:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            ret_conv = (ty_info.rust_obj + "* ret = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*ret = ", ";"),
                            ret_conv_name = "(long)ret",
                            arg_conv = None, arg_conv_name = None)
                else:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        ret_conv = ("long ret = (long)", ";"), ret_conv_name = "ret",
                        arg_conv = None, arg_conv_name = None)
            else:
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = None, ret_conv = None, ret_conv_name = None)

    def map_fn(line, re_match, ret_arr_len, c_call_string):
        out_java.write("\t// " + line)
        out_java.write("\tpublic static native ")
        out_c.write("JNIEXPORT ")

        ret_info = map_type(re_match.group(1), True, ret_arr_len, False)
        ret_info.print_ty()
        if ret_info.ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = ret_info.ret_conv

        out_java.write(" " + re_match.group(2) + "(")
        out_c.write(" JNICALL Java_org_ldk_impl_bindings_" + re_match.group(2).replace('_', '_1') + "(JNIEnv * _env, jclass _b")

        arg_names = []
        for idx, arg in enumerate(re_match.group(3).split(',')):
            if idx != 0:
                out_java.write(", ")
            if arg != "void":
                out_c.write(", ")
            arg_conv_info = map_type(arg, False, None, re_match.group(2).endswith("_free"))
            if arg_conv_info.c_ty != "void":
                arg_conv_info.print_ty()
                arg_conv_info.print_name()
            arg_names.append(arg_conv_info)

        out_java.write(");\n")
        out_c.write(") {\n")

        for info in arg_names:
            if info.arg_conv is not None:
                out_c.write("\t" + info.arg_conv.replace('\n', "\n\t") + "\n");

        if ret_info.ret_conv is not None:
            out_c.write("\t" + ret_conv_pfx.replace('\n', '\n\t'));
        else:
            out_c.write("\treturn ");

        if c_call_string is None:
            out_c.write(re_match.group(2) + "(")
        else:
            out_c.write(c_call_string)
        for idx, info in enumerate(arg_names):
            if info.arg_conv_name is not None:
                if idx != 0:
                    out_c.write(", ")
                elif c_call_string is not None:
                    continue
                out_c.write(info.arg_conv_name)
        out_c.write(")")
        if ret_info.ret_conv is not None:
            out_c.write(ret_conv_sfx.replace('\n', '\n\t'))
            out_c.write("\n\treturn " + ret_info.ret_conv_name + ";")
        else:
            out_c.write(";")
        out_c.write("\n}\n\n")

    def map_unitary_enum(struct_name, field_lines):
        with open(sys.argv[3] + "/" + struct_name + ".java", "w") as out_java_enum:
            out_java_enum.write("package org.ldk.enums;\n\n")
            unitary_enums.add(struct_name)
            out_c.write("static inline " + struct_name + " " + struct_name + "_from_java(JNIEnv *env, jclass val) {\n")
            out_c.write("\tswitch ((*env)->CallIntMethod(env, val, ordinal_meth)) {\n")
            ord_v = 0
            for idx, struct_line in enumerate(field_lines):
                if idx == 0:
                    out_java_enum.write("public enum " + struct_name + " {\n")
                elif idx == len(field_lines) - 3:
                    assert(struct_line.endswith("_Sentinel,"))
                elif idx == len(field_lines) - 2:
                    out_java_enum.write("\t; static native void init();\n")
                    out_java_enum.write("\tstatic { init(); }\n")
                    out_java_enum.write("}")
                    out_java.write("\tstatic { " + struct_name + ".values(); /* Force enum statics to run */ }\n")
                elif idx == len(field_lines) - 1:
                    assert(struct_line == "")
                else:
                    out_java_enum.write(struct_line + "\n")
                    out_c.write("\t\tcase %d: return %s;\n" % (ord_v, struct_line.strip().strip(",")))
                    ord_v = ord_v + 1
            out_c.write("\t}\n")
            out_c.write("\tabort();\n")
            out_c.write("}\n")

            ord_v = 0
            out_c.write("static jclass " + struct_name + "_class = NULL;\n")
            for idx, struct_line in enumerate(field_lines):
                if idx > 0 and idx < len(field_lines) - 3:
                    variant = struct_line.strip().strip(",")
                    out_c.write("static jfieldID " + struct_name + "_" + variant + " = NULL;\n")
            out_c.write("JNIEXPORT void JNICALL Java_org_ldk_enums_" + struct_name.replace("_", "_1") + "_init (JNIEnv * env, jclass clz) {\n")
            out_c.write("\t" + struct_name + "_class = (*env)->NewGlobalRef(env, clz);\n")
            out_c.write("\tDO_ASSERT(" + struct_name + "_class != NULL);\n")
            for idx, struct_line in enumerate(field_lines):
                if idx > 0 and idx < len(field_lines) - 3:
                    variant = struct_line.strip().strip(",")
                    out_c.write("\t" + struct_name + "_" + variant + " = (*env)->GetStaticFieldID(env, " + struct_name + "_class, \"" + variant + "\", \"Lorg/ldk/enums/" + struct_name + ";\");\n")
                    out_c.write("\tDO_ASSERT(" + struct_name + "_" + variant + " != NULL);\n")
            out_c.write("}\n")
            out_c.write("static inline jclass " + struct_name + "_to_java(JNIEnv *env, " + struct_name + " val) {\n")
            out_c.write("\tswitch (val) {\n")
            for idx, struct_line in enumerate(field_lines):
                if idx > 0 and idx < len(field_lines) - 3:
                    variant = struct_line.strip().strip(",")
                    out_c.write("\t\tcase " + variant + ":\n")
                    out_c.write("\t\t\treturn (*env)->GetStaticObjectField(env, " + struct_name + "_class, " + struct_name + "_" + variant + ");\n")
                    ord_v = ord_v + 1
            out_c.write("\t\tdefault: abort();\n")
            out_c.write("\t}\n")
            out_c.write("}\n\n")

    def map_complex_enum(struct_name, union_enum_items):
        tag_field_lines = union_enum_items["field_lines"]
        init_meth_jty_strs = {}
        for idx, struct_line in enumerate(tag_field_lines):
            if idx == 0:
                out_java.write("\tpublic static class " + struct_name + " {\n")
                out_java.write("\t\tprivate " + struct_name + "() {}\n")
            elif idx == len(tag_field_lines) - 3:
                assert(struct_line.endswith("_Sentinel,"))
            elif idx == len(tag_field_lines) - 2:
                out_java.write("\t\tstatic native void init();\n")
                out_java.write("\t}\n")
            elif idx == len(tag_field_lines) - 1:
                assert(struct_line == "")
            else:
                var_name = struct_line.strip(' ,')[len(struct_name) + 1:]
                out_java.write("\t\tpublic final static class " + var_name + " extends " + struct_name + " {\n")
                out_c.write("static jclass " + struct_name + "_" + var_name + "_class = NULL;\n")
                out_c.write("static jmethodID " + struct_name + "_" + var_name + "_meth = NULL;\n")
                init_meth_jty_str = ""
                init_meth_params = ""
                init_meth_body = ""
                if "LDK" + var_name in union_enum_items:
                    enum_var_lines = union_enum_items["LDK" + var_name]
                    for idx, field in enumerate(enum_var_lines):
                        if idx != 0 and idx < len(enum_var_lines) - 2:
                            field_ty = java_c_types(field.strip(' ;'), None)
                            out_java.write("\t\t\tpublic " + field_ty.java_ty + " " + field_ty.var_name + ";\n")
                            init_meth_jty_str = init_meth_jty_str + field_ty.java_fn_ty_arg
                            if idx > 1:
                                init_meth_params = init_meth_params + ", "
                            init_meth_params = init_meth_params + field_ty.java_ty + " " + field_ty.var_name
                            init_meth_body = init_meth_body + "this." + field_ty.var_name + " = " + field_ty.var_name + "; "
                    out_java.write("\t\t\t" + var_name + "(" + init_meth_params + ") { ")
                    out_java.write(init_meth_body)
                    out_java.write("}\n")
                out_java.write("\t\t}\n")
                init_meth_jty_strs[var_name] = init_meth_jty_str
        out_java.write("\tstatic { " + struct_name + ".init(); }\n")
        out_java.write("\tpublic static native " + struct_name + " " + struct_name + "_ref_from_ptr(long ptr);\n");

        out_c.write("JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024" + struct_name.replace("_", "_1") + "_init (JNIEnv * env, jclass _a) {\n")
        for idx, struct_line in enumerate(tag_field_lines):
            if idx != 0 and idx < len(tag_field_lines) - 3:
                var_name = struct_line.strip(' ,')[len(struct_name) + 1:]
                out_c.write("\t" + struct_name + "_" + var_name + "_class =\n")
                out_c.write("\t\t(*env)->NewGlobalRef(env, (*env)->FindClass(env, \"Lorg/ldk/impl/bindings$" + struct_name + "$" + var_name + ";\"));\n")
                out_c.write("\tDO_ASSERT(" + struct_name + "_" + var_name + "_class != NULL);\n")
                out_c.write("\t" + struct_name + "_" + var_name + "_meth = (*env)->GetMethodID(env, " + struct_name + "_" + var_name + "_class, \"<init>\", \"(" + init_meth_jty_strs[var_name] + ")V\");\n")
                out_c.write("\tDO_ASSERT(" + struct_name + "_" + var_name + "_meth != NULL);\n")
        out_c.write("}\n")
        out_c.write("JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {\n")
        out_c.write("\t" + struct_name + " *obj = (" + struct_name + "*)ptr;\n")
        out_c.write("\tswitch(obj->tag) {\n")
        for idx, struct_line in enumerate(tag_field_lines):
            if idx != 0 and idx < len(tag_field_lines) - 3:
                var_name = struct_line.strip(' ,')[len(struct_name) + 1:]
                out_c.write("\t\tcase " + struct_name + "_" + var_name + ": {\n")
                c_params_text = ""
                if "LDK" + var_name in union_enum_items:
                    enum_var_lines = union_enum_items["LDK" + var_name]
                    for idx, field in enumerate(enum_var_lines):
                        if idx != 0 and idx < len(enum_var_lines) - 2:
                            field_map = map_type(field.strip(' ;'), False, None, False)
                            if field_map.ret_conv is not None:
                                out_c.write("\t\t\t" + field_map.ret_conv[0].replace("\n", "\n\t\t\t").replace("_env", "env"))
                                out_c.write("obj->" + camel_to_snake(var_name) + "." + field_map.arg_name)
                                out_c.write(field_map.ret_conv[1].replace("\n", "\n\t\t\t") + "\n")
                                c_params_text = c_params_text + ", " + field_map.ret_conv_name
                            else:
                                c_params_text = c_params_text + ", obj->" + camel_to_snake(var_name) + "." + field_map.arg_name
                out_c.write("\t\t\treturn (*env)->NewObject(env, " + struct_name + "_" + var_name + "_class, " + struct_name + "_" + var_name + "_meth" + c_params_text + ");\n")
                out_c.write("\t\t}\n")
        out_c.write("\t\tdefault: abort();\n")
        out_c.write("\t}\n}\n")

    def map_trait(struct_name, field_var_lines, trait_fn_lines):
        out_c.write("typedef struct " + struct_name + "_JCalls {\n")
        out_c.write("\tatomic_size_t refcnt;\n")
        out_c.write("\tJavaVM *vm;\n")
        out_c.write("\tjobject o;\n")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write("\t" + var_line.group(1) + "_JCalls* " + var_line.group(2) + ";\n")
        for fn_line in trait_fn_lines:
            if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                out_c.write("\tjmethodID " + fn_line.group(2) + "_meth;\n")
        out_c.write("} " + struct_name + "_JCalls;\n")

        out_java.write("\tpublic interface " + struct_name + " {\n")
        java_meths = []
        for fn_line in trait_fn_lines:
            java_meth_descr = "("
            if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                ret_ty_info = java_c_types(fn_line.group(1), None)

                out_java.write("\t\t " + ret_ty_info.java_ty + " " + fn_line.group(2) + "(")
                is_const = fn_line.group(3) is not None
                out_c.write(fn_line.group(1) + fn_line.group(2) + "_jcall(")
                if is_const:
                    out_c.write("const void* this_arg")
                else:
                    out_c.write("void* this_arg")

                arg_names = []
                for idx, arg in enumerate(fn_line.group(4).split(',')):
                    if arg == "":
                        continue
                    if idx >= 2:
                        out_java.write(", ")
                    out_c.write(", ")
                    arg_conv_info = map_type(arg, True, None, False)
                    out_c.write(arg.strip())
                    out_java.write(arg_conv_info.java_ty + " " + arg_conv_info.arg_name)
                    arg_names.append(arg_conv_info)
                    java_meth_descr = java_meth_descr + arg_conv_info.java_fn_ty_arg
                java_meth_descr = java_meth_descr + ")" + ret_ty_info.java_fn_ty_arg
                java_meths.append(java_meth_descr)

                out_java.write(");\n")
                out_c.write(") {\n")
                out_c.write("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")
                out_c.write("\tJNIEnv *env;\n")
                out_c.write("\tDO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);\n")

                for arg_info in arg_names:
                    if arg_info.ret_conv is not None:
                        out_c.write("\t" + arg_info.ret_conv[0].replace('\n', '\n\t').replace("_env", "env"));
                        out_c.write(arg_info.arg_name)
                        out_c.write(arg_info.ret_conv[1].replace('\n', '\n\t').replace("_env", "env") + "\n")

                if ret_ty_info.c_ty.endswith("Array"):
                    assert(ret_ty_info.c_ty == "jbyteArray")
                    out_c.write("\tjbyteArray jret = (*env)->CallObjectMethod(env, j_calls->o, j_calls->" + fn_line.group(2) + "_meth")
                elif not ret_ty_info.passed_as_ptr:
                    out_c.write("\treturn (*env)->Call" + ret_ty_info.java_ty.title() + "Method(env, j_calls->o, j_calls->" + fn_line.group(2) + "_meth")
                else:
                    out_c.write("\t" + fn_line.group(1).strip() + "* ret = (" + fn_line.group(1).strip() + "*)(*env)->CallLongMethod(env, j_calls->o, j_calls->" + fn_line.group(2) + "_meth");

                for arg_info in arg_names:
                    if arg_info.ret_conv is not None:
                        out_c.write(", " + arg_info.ret_conv_name)
                    else:
                        out_c.write(", " + arg_info.arg_name)
                out_c.write(");\n");
                if ret_ty_info.c_ty.endswith("Array"):
                    out_c.write("\t" + ret_ty_info.rust_obj + " ret;\n")
                    out_c.write("\t(*env)->GetByteArrayRegion(env, jret, 0, " + ret_ty_info.arr_len + ", ret." + ret_ty_info.arr_access + ");\n")
                    out_c.write("\treturn ret;\n")

                if ret_ty_info.passed_as_ptr:
                    out_c.write("\t" + fn_line.group(1).strip() + " res = *ret;\n")
                    out_c.write("\tFREE(ret);\n")
                    out_c.write("\treturn res;\n")
                out_c.write("}\n")
            elif fn_line.group(2) == "free":
                out_c.write("static void " + struct_name + "_JCalls_free(void* this_arg) {\n")
                out_c.write("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")
                out_c.write("\tif (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {\n")
                out_c.write("\t\tJNIEnv *env;\n")
                out_c.write("\t\tDO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);\n")
                out_c.write("\t\t(*env)->DeleteGlobalRef(env, j_calls->o);\n")
                out_c.write("\t\tFREE(j_calls);\n")
                out_c.write("\t}\n}\n")

        # Write out a clone function whether we need one or not, as we use them in moving to rust
        out_c.write("static void* " + struct_name + "_JCalls_clone(const void* this_arg) {\n")
        out_c.write("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")
        out_c.write("\tatomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);\n")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write("\tatomic_fetch_add_explicit(&j_calls->" + var_line.group(2) + "->refcnt, 1, memory_order_release);\n")
        out_c.write("\treturn (void*) this_arg;\n")
        out_c.write("}\n")

        out_java.write("\t}\n")

        out_java.write("\tpublic static native long " + struct_name + "_new(" + struct_name + " impl")
        out_c.write("static inline " + struct_name + " " + struct_name + "_init (JNIEnv * env, jclass _a, jobject o")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_java.write(", " + var_line.group(1) + " " + var_line.group(2))
                out_c.write(", jobject " + var_line.group(2))
        out_java.write(");\n")
        out_c.write(") {\n")

        out_c.write("\tjclass c = (*env)->GetObjectClass(env, o);\n")
        out_c.write("\tDO_ASSERT(c != NULL);\n")
        out_c.write("\t" + struct_name + "_JCalls *calls = MALLOC(sizeof(" + struct_name + "_JCalls), \"" + struct_name + "_JCalls\");\n")
        out_c.write("\tatomic_init(&calls->refcnt, 1);\n")
        out_c.write("\tDO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);\n")
        out_c.write("\tcalls->o = (*env)->NewGlobalRef(env, o);\n")
        for (fn_line, java_meth_descr) in zip(trait_fn_lines, java_meths):
            if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                out_c.write("\tcalls->" + fn_line.group(2) + "_meth = (*env)->GetMethodID(env, c, \"" + fn_line.group(2) + "\", \"" + java_meth_descr + "\");\n")
                out_c.write("\tDO_ASSERT(calls->" + fn_line.group(2) + "_meth != NULL);\n")
        out_c.write("\n\t" + struct_name + " ret = {\n")
        out_c.write("\t\t.this_arg = (void*) calls,\n")
        for fn_line in trait_fn_lines:
            if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                out_c.write("\t\t." + fn_line.group(2) + " = " + fn_line.group(2) + "_jcall,\n")
            elif fn_line.group(2) == "free":
                out_c.write("\t\t.free = " + struct_name + "_JCalls_free,\n")
            else:
                out_c.write("\t\t.clone = " + struct_name + "_JCalls_clone,\n")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write("\t\t." + var_line.group(2) + " = " + var_line.group(1) + "_init(env, _a, " + var_line.group(2) + "),\n")
        out_c.write("\t};\n")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write("\tcalls->" + var_line.group(2) + " = ret." + var_line.group(2) + ".this_arg;\n")
        out_c.write("\treturn ret;\n")
        out_c.write("}\n")

        out_c.write("JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1new (JNIEnv * env, jclass _a, jobject o")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write(", jobject " + var_line.group(2))
        out_c.write(") {\n")
        out_c.write("\t" + struct_name + " *res_ptr = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
        out_c.write("\t*res_ptr = " + struct_name + "_init(env, _a, o")
        for var_line in field_var_lines:
            if var_line.group(1) in trait_structs:
                out_c.write(", " + var_line.group(2))
        out_c.write(");\n")
        out_c.write("\treturn (long)res_ptr;\n")
        out_c.write("}\n")

        out_java.write("\tpublic static native " + struct_name + " " + struct_name + "_get_obj_from_jcalls(long val);\n")
        out_c.write("JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {\n")
        out_c.write("\treturn ((" + struct_name + "_JCalls*)val)->o;\n")
        out_c.write("}\n")

        for fn_line in trait_fn_lines:
            # For now, just disable enabling the _call_log - we don't know how to inverse-map String
            is_log = fn_line.group(2) == "log" and struct_name == "LDKLogger"
            if fn_line.group(2) != "free" and fn_line.group(2) != "clone" and fn_line.group(2) != "eq" and not is_log:
                dummy_line = fn_line.group(1) + struct_name + "_call_" + fn_line.group(2) + " " + struct_name + "* arg" + fn_line.group(4) + "\n"
                map_fn(dummy_line, re.compile("([A-Za-z_0-9]*) *([A-Za-z_0-9]*) *(.*)").match(dummy_line), None, "(arg_conv->" + fn_line.group(2) + ")(arg_conv->this_arg")

    out_c.write("""#include \"org_ldk_impl_bindings.h\"
#include <rust_types.h>
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
""")

    if sys.argv[4] == "false":
        out_c.write("#define MALLOC(a, _) malloc(a)\n")
        out_c.write("#define FREE free\n")
        out_c.write("#define DO_ASSERT(a) (void)(a)\n")
    else:
        out_c.write("""#include <assert.h>
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)

// Running a leak check across all the allocations and frees of the JDK is a mess,
// so instead we implement our own naive leak checker here, relying on the -wrap
// linker option to wrap malloc/calloc/realloc/free, tracking everyhing allocated
// and free'd in Rust or C across the generated bindings shared library.
#include <threads.h>
#include <execinfo.h>
#include <unistd.h>
static mtx_t allocation_mtx;

void __attribute__((constructor)) init_mtx() {
	DO_ASSERT(mtx_init(&allocation_mtx, mtx_plain) == thrd_success);
}

#define BT_MAX 128
typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
	void* bt[BT_MAX];
	int bt_len;
} allocation;
static allocation* allocation_ll = NULL;

void* __real_malloc(size_t len);
void* __real_calloc(size_t nmemb, size_t len);
static void new_allocation(void* res, const char* struct_name) {
	allocation* new_alloc = __real_malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	new_alloc->bt_len = backtrace(new_alloc->bt, BT_MAX);
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name);
	return res;
}
void __real_free(void* ptr);
static void alloc_freed(void* ptr) {
	allocation* p = NULL;
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	allocation* it = allocation_ll;
	while (it->ptr != ptr) { p = it; it = it->next; }
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
	DO_ASSERT(it->ptr == ptr);
	__real_free(it);
}
static void FREE(void* ptr) {
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
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __real_realloc(void* ptr, size_t newlen);
void* __wrap_realloc(void* ptr, size_t len) {
	alloc_freed(ptr);
	void* res = __real_realloc(ptr, len);
	new_allocation(res, "realloc call");
	return res;
}
void __wrap_reallocarray(void* ptr, size_t new_sz) {
	// Rust doesn't seem to use reallocarray currently
	assert(false);
}

void __attribute__((destructor)) check_leaks() {
	for (allocation* a = allocation_ll; a != NULL; a = a->next) {
		fprintf(stderr, "%s %p remains:\\n", a->struct_name, a->ptr);
		backtrace_symbols_fd(a->bt, a->bt_len, STDERR_FILENO);
		fprintf(stderr, "\\n\\n");
	}
	DO_ASSERT(allocation_ll == NULL);
}
""")
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
	}
	static native void init(java.lang.Class c, java.lang.Class slicedef);

	public static native boolean deref_bool(long ptr);
	public static native long deref_long(long ptr);
	public static native void free_heap_ptr(long ptr);
	public static native byte[] read_bytes(long ptr, long len);
	public static native byte[] get_u8_slice_bytes(long slice_ptr);
	public static native long bytes_to_u8_vec(byte[] bytes);
	public static native long new_txpointer_copy_data(byte[] txdata);
	public static native long vec_slice_len(long vec);
	public static native long new_empty_slice_vec();

""")
    out_c.write("""
static jmethodID ordinal_meth = NULL;
static jmethodID slicedef_meth = NULL;
static jclass slicedef_cls = NULL;
JNIEXPORT void Java_org_ldk_impl_bindings_init(JNIEnv * env, jclass _b, jclass enum_class, jclass slicedef_class) {
	ordinal_meth = (*env)->GetMethodID(env, enum_class, "ordinal", "()I");
	DO_ASSERT(ordinal_meth != NULL);
	slicedef_meth = (*env)->GetMethodID(env, slicedef_class, "<init>", "(JJJ)V");
	DO_ASSERT(slicedef_meth != NULL);
	slicedef_cls = (*env)->NewGlobalRef(env, slicedef_class);
	DO_ASSERT(slicedef_cls != NULL);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_deref_1bool (JNIEnv * env, jclass _a, jlong ptr) {
	return *((bool*)ptr);
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_deref_1long (JNIEnv * env, jclass _a, jlong ptr) {
	return *((long*)ptr);
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_free_1heap_1ptr (JNIEnv * env, jclass _a, jlong ptr) {
	FREE((void*)ptr);
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_read_1bytes (JNIEnv * _env, jclass _b, jlong ptr, jlong len) {
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, len);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, len, (unsigned char*)ptr);
	return ret_arr;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_get_1u8_1slice_1bytes (JNIEnv * _env, jclass _b, jlong slice_ptr) {
	LDKu8slice *slice = (LDKu8slice*)slice_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, slice->datalen);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, slice->datalen, slice->data);
	return ret_arr;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_bytes_1to_1u8_1vec (JNIEnv * _env, jclass _b, jbyteArray bytes) {
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8");
	vec->datalen = (*_env)->GetArrayLength(_env, bytes);
	vec->data = (uint8_t*)MALLOC(vec->datalen, "LDKCVec_u8Z Bytes");
	(*_env)->GetByteArrayRegion (_env, bytes, 0, vec->datalen, vec->data);
	return (long)vec;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1txpointer_1copy_1data (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKTransaction *txdata = (LDKTransaction*)MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	txdata->datalen = (*env)->GetArrayLength(env, bytes);
	txdata->data = (uint8_t*)MALLOC(txdata->datalen, "Tx Data Bytes");
	txdata->data_is_owned = true;
	(*env)->GetByteArrayRegion (env, bytes, 0, txdata->datalen, txdata->data);
	return (long)txdata;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_vec_1slice_1len (JNIEnv * env, jclass _a, jlong ptr) {
        // Check offsets of a few Vec types are all consistent as we're meant to be generic across types
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_SignatureZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_MessageSendEventZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_EventZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_C2Tuple_usizeTransactionZZ, datalen), "Vec<*> needs to be mapped identically");
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)ptr;
	return (long)vec->datalen;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1empty_1slice_1vec (JNIEnv * _env, jclass _b) {
        // Check sizes of a few Vec types are all consistent as we're meant to be generic across types
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_SignatureZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_MessageSendEventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_EventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "Vec<*> needs to be mapped identically");
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "Empty LDKCVec");
	vec->data = NULL;
	vec->datalen = 0;
	return (long)vec;
}

// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

""")

    # XXX: Temporarily write out a manual SecretKey_new() for testing, we should auto-gen this kind of thing
    out_java.write("\tpublic static native long LDKSecretKey_new();\n\n") # TODO: rm me
    out_c.write("JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKSecretKey_1new(JNIEnv * _env, jclass _b) {\n") # TODO: rm me
    out_c.write("\tLDKSecretKey* key = (LDKSecretKey*)MALLOC(sizeof(LDKSecretKey), \"LDKSecretKey\");\n") # TODO: rm me
    out_c.write("\treturn (long)key;\n") # TODO: rm me
    out_c.write("}\n") # TODO: rm me

    in_block_comment = False
    cur_block_obj = None

    fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
    fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[([0-9]*)\];$")
    reg_fn_regex = re.compile("([A-Za-z_0-9\* ]* \*?)([a-zA-Z_0-9]*)\((.*)\);$")
    const_val_regex = re.compile("^extern const ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")

    line_indicates_result_regex = re.compile("^   (LDKCResultPtr_[A-Za-z_0-9]*) contents;$")
    line_indicates_vec_regex = re.compile("^   ([A-Za-z_0-9]*) \*data;$")
    line_indicates_opaque_regex = re.compile("^   bool is_owned;$")
    line_indicates_trait_regex = re.compile("^   ([A-Za-z_0-9]* \*?)\(\*([A-Za-z_0-9]*)\)\((const )?void \*this_arg(.*)\);$")
    assert(line_indicates_trait_regex.match("   uintptr_t (*send_data)(void *this_arg, LDKu8slice data, bool resume_read);"))
    assert(line_indicates_trait_regex.match("   LDKCVec_MessageSendEventZ (*get_and_clear_pending_msg_events)(const void *this_arg);"))
    assert(line_indicates_trait_regex.match("   void *(*clone)(const void *this_arg);"))
    line_field_var_regex = re.compile("^   ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")
    assert(line_field_var_regex.match("   LDKMessageSendEventsProvider MessageSendEventsProvider;"))
    struct_name_regex = re.compile("^typedef (struct|enum|union) (MUST_USE_STRUCT )?(LDK[A-Za-z_0-9]*) {$")
    assert(struct_name_regex.match("typedef struct LDKCVecTempl_u8 {"))
    assert(struct_name_regex.match("typedef enum LDKNetwork {"))
    struct_alias_regex = re.compile("^typedef (LDK[A-Za-z_0-9]*) (LDK[A-Za-z_0-9]*);$")
    assert(struct_alias_regex.match("typedef LDKCResultTempl_bool__PeerHandleError LDKCResult_boolPeerHandleErrorZ;"))

    result_templ_structs = set()
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
                        if vec_ty_match is not None and struct_name.startswith("LDKCVecTempl_"):
                            vec_ty = vec_ty_match.group(1)
                        elif struct_name.startswith("LDKC2TupleTempl_") or struct_name.startswith("LDKC3TupleTempl_"):
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
                elif result_contents is not None:
                    result_templ_structs.add(struct_name)
                    assert result_contents in result_ptr_struct_items
                elif struct_name.startswith("LDKCResultPtr_"):
                    for line in field_lines:
                        if line.endswith("*result;"):
                            res_ty = line[:-8].strip()
                        elif line.endswith("*err;"):
                            err_ty = line[:-5].strip()
                    result_ptr_struct_items[struct_name] = (res_ty, err_ty)
                elif is_tuple:
                    out_java.write("\tpublic static native long " + struct_name + "_new(")
                    out_c.write("JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1new(JNIEnv *_env, jclass _b")
                    for idx, line in enumerate(field_lines):
                        if idx != 0 and idx < len(field_lines) - 2:
                            ty_info = java_c_types(line.strip(';'), None)
                            if idx != 1:
                                out_java.write(", ")
                            e = chr(ord('a') + idx - 1)
                            out_java.write(ty_info.java_ty + " " + e)
                            out_c.write(", " + ty_info.c_ty + " " + e)
                    out_java.write(");\n")
                    out_c.write(") {\n")
                    out_c.write("\t" + struct_name + "* ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
                    for idx, line in enumerate(field_lines):
                        if idx != 0 and idx < len(field_lines) - 2:
                            ty_info = map_type(line.strip(';'), False, None, False)
                            e = chr(ord('a') + idx - 1)
                            if ty_info.arg_conv is not None:
                                out_c.write("\t" + ty_info.arg_conv.replace("\n", "\n\t"))
                                out_c.write("\n\tret->" + e + " = " + ty_info.arg_conv_name + ";\n")
                            else:
                                out_c.write("\tret->" + e + " = " + e + ";\n")
                    out_c.write("\treturn (long)ret;\n")
                    out_c.write("}\n")
                elif vec_ty is not None:
                    if vec_ty in opaque_structs:
                        out_java.write("\tpublic static native long[] " + struct_name + "_arr_info(long vec_ptr);\n")
                        out_c.write("JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {\n")
                    else:
                        out_java.write("\tpublic static native VecOrSliceDef " + struct_name + "_arr_info(long vec_ptr);\n")
                        out_c.write("JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {\n")
                    out_c.write("\t" + struct_name + " *vec = (" + struct_name + "*)ptr;\n")
                    if vec_ty in opaque_structs:
                        out_c.write("\tjlongArray ret = (*env)->NewLongArray(env, vec->datalen);\n")
                        out_c.write("\tjlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);\n")
                        out_c.write("\tfor (size_t i = 0; i < vec->datalen; i++) {\n")
                        out_c.write("\t\tDO_ASSERT((((long)vec->data[i].inner) & 1) == 0);\n")
                        out_c.write("\t\tret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);\n")
                        out_c.write("\t}\n")
                        out_c.write("\t(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);\n")
                        out_c.write("\treturn ret;\n")
                    else:
                        out_c.write("\treturn (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(" + vec_ty + "));\n")
                    out_c.write("}\n")

                    ty_info = map_type(vec_ty + " arr_elem", False, None, False)
                    if len(ty_info.java_fn_ty_arg) == 1: # ie we're a primitive of some form
                        out_java.write("\tpublic static native long " + struct_name + "_new(" + ty_info.java_ty + "[] elems);\n")
                        out_c.write("JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1new(JNIEnv *env, jclass _b, j" + ty_info.java_ty + "Array elems){\n")
                        out_c.write("\t" + struct_name + " *ret = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n")
                        out_c.write("\tret->datalen = (*env)->GetArrayLength(env, elems);\n")
                        out_c.write("\tif (ret->datalen == 0) {\n")
                        out_c.write("\t\tret->data = NULL;\n")
                        out_c.write("\t} else {\n")
                        out_c.write("\t\tret->data = MALLOC(sizeof(" + vec_ty + ") * ret->datalen, \"" + struct_name + " Data\");\n")
                        out_c.write("\t\t" + ty_info.c_ty + " *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);\n")
                        out_c.write("\t\tfor (size_t i = 0; i < ret->datalen; i++) {\n")
                        if ty_info.arg_conv is not None:
                            out_c.write("\t\t\t" + ty_info.c_ty + " arr_elem = java_elems[i];\n")
                            out_c.write("\t\t\t" + ty_info.arg_conv.replace("\n", "\n\t\t\t") + "\n")
                            out_c.write("\t\t\tret->data[i] = " + ty_info.arg_conv_name + ";\n")
                        else:
                            out_c.write("\t\t\tret->data[i] = java_elems[i];\n")
                        out_c.write("\t\t}\n")
                        out_c.write("\t\t(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);\n")
                        out_c.write("\t}\n")
                        out_c.write("\treturn (long)ret;\n")
                        out_c.write("}\n")
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
            elif line.startswith("typedef "):
                alias_match =  struct_alias_regex.match(line)
                if alias_match.group(1) in result_templ_structs:
                    out_java.write("\tpublic static native boolean " + alias_match.group(2) + "_result_ok(long arg);\n")
                    out_java.write("\tpublic static native long " + alias_match.group(2) + "_get_inner(long arg);\n")
                    out_c.write("JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_" + alias_match.group(2).replace("_", "_1") + "_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {\n")
                    out_c.write("\treturn ((" + alias_match.group(2) + "*)arg)->result_ok;\n")
                    out_c.write("}\n")
                    out_c.write("JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_" + alias_match.group(2).replace("_", "_1") + "_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {\n")
                    contents_ty = alias_match.group(1).replace("LDKCResultTempl", "LDKCResultPtr")
                    res_ty, err_ty = result_ptr_struct_items[contents_ty]
                    out_c.write("\t" + alias_match.group(2) + " *val = (" + alias_match.group(2) + "*)arg;\n")
                    out_c.write("\tif (val->result_ok) {\n")
                    if res_ty not in opaque_structs:
                        out_c.write("\t\treturn (long)val->contents.result;\n")
                    else:
                        out_c.write("\t\treturn (long)(val->contents.result->inner) | (val->contents.result->is_owned ? 1 : 0);\n")
                    out_c.write("\t} else {\n")
                    if err_ty not in opaque_structs:
                        out_c.write("\t\treturn (long)val->contents.err;\n")
                    else:
                        out_c.write("\t\treturn (long)(val->contents.err->inner) | (val->contents.err->is_owned ? 1 : 0);\n")
                    out_c.write("\t}\n}\n")
                pass
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
