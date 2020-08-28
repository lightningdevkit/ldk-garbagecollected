#!/usr/bin/env python3
import sys, re

if len(sys.argv) != 4:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output.java /path/to/bindings/output.c")
    sys.exit(1)

with open(sys.argv[1]) as in_h, open(sys.argv[2], "w") as out_java, open(sys.argv[3], "w") as out_c:
    opaque_structs = set()

    var_is_arr_regex = re.compile("\(\*([A-za-z_]*)\)\[([0-9]*)\]")
    var_ty_regex = re.compile("([A-za-z_0-9]*)(.*)")
    def java_c_types(fn_arg, ret_arr_len):
        fn_arg = fn_arg.strip()
        if fn_arg.startswith("MUST_USE_RES "):
            fn_arg = fn_arg[13:]
        if fn_arg.startswith("const "):
            fn_arg = fn_arg[6:]

        is_ptr = False
        if fn_arg.startswith("void"):
            java_ty = "void"
            c_ty = "void"
            fn_arg = fn_arg[4:].strip()
        elif fn_arg.startswith("bool"):
            java_ty = "boolean"
            c_ty = "jboolean"
            fn_arg = fn_arg[4:].strip()
        elif fn_arg.startswith("uint8_t"):
            java_ty = "byte"
            c_ty = "jbyte"
            fn_arg = fn_arg[7:].strip()
        elif fn_arg.startswith("uint32_t"):
            java_ty = "int"
            c_ty = "jint"
            fn_arg = fn_arg[8:].strip()
        elif fn_arg.startswith("uint64_t"):
            java_ty = "long"
            c_ty = "jlong"
            fn_arg = fn_arg[8:].strip()
        else:
            ma = var_ty_regex.match(fn_arg)
            java_ty = "long"
            c_ty = "jlong"
            fn_arg = ma.group(2).strip()
            is_ptr = True

        if fn_arg.startswith(" *") or fn_arg.startswith("*"):
            fn_arg = fn_arg.replace("*", "").strip()
            is_ptr = True
            c_ty = "jlong"
            java_ty = "long"

        var_is_arr = var_is_arr_regex.match(fn_arg)
        if var_is_arr is not None or ret_arr_len is not None:
            java_ty = java_ty + "[]"
            c_ty = c_ty + "Array"
            if var_is_arr is not None:
                return (java_ty, c_ty, is_ptr, var_is_arr.group(1))
        return (java_ty, c_ty, is_ptr, fn_arg)

    def map_type(fn_arg, print_void, ret_arr_len, is_free):
        fn_arg = fn_arg.strip()
        if fn_arg.startswith("MUST_USE_RES "):
            fn_arg = fn_arg[13:]
        if fn_arg.startswith("const "):
            fn_arg = fn_arg[6:]

        (java_ty, c_ty, is_ptr, _) = java_c_types(fn_arg, ret_arr_len)
        is_ptr_to_obj = None
        if fn_arg.startswith("void"):
            if not print_void:
                return (None, None, None)
            fn_arg = fn_arg.strip("void ")
        elif not is_ptr:
            split = fn_arg.split(" ", 2)
            if len(split) > 1:
                fn_arg = split[1]
            else:
                fn_arg = ""
        else:
            ma = var_ty_regex.match(fn_arg)
            is_ptr_to_obj = ma.group(1)
            fn_arg = ma.group(2)
        assert(c_ty is not None)
        assert(java_ty is not None)
        out_c.write(c_ty)
        out_java.write(java_ty)

        var_is_arr = var_is_arr_regex.match(fn_arg)
        no_ptr = fn_arg.replace('*', '')
        if var_is_arr is not None or ret_arr_len is not None:
            if var_is_arr is not None:
                arr_name = var_is_arr.group(1)
                arr_len = var_is_arr.group(2)
                out_java.write(" " + arr_name)
                out_c.write(" " + arr_name)
            else:
                arr_name = "ret"
                arr_len = ret_arr_len
            assert(c_ty == "jbyteArray")
            return ("unsigned char " + arr_name + "_arr[" + arr_len + "];\n" +
                    "(*_env)->GetByteArrayRegion (_env, """ + arr_name + ", 0, " + arr_len + ", " + arr_name + "_arr);\n" +
                    "unsigned char (*""" + arr_name + "_ref)[" + arr_len + "] = &" + arr_name + "_arr;",
                (c_ty + " " + arr_name + "_arr = (*_env)->NewByteArray(_env, " + arr_len + ");\n" +
                    "(*_env)->SetByteArrayRegion(_env, " + arr_name + "_arr, 0, " + arr_len + ", *",
                    ");\nreturn ret_arr;"),
                arr_name + "_ref")
        elif no_ptr.strip() != "":
            # If we have a parameter name, print it (noting that it may indicate its a pointer)
            out_java.write(" " + no_ptr.strip())
            out_c.write(" " + no_ptr.strip())
            if is_ptr_to_obj is not None:
                if no_ptr == fn_arg:
                    base_conv = is_ptr_to_obj + " " + no_ptr.strip() + "_conv = *(" + is_ptr_to_obj + "*)" + no_ptr.strip() + ";\nfree((void*)" + no_ptr.strip() + ");";
                    if is_ptr_to_obj in opaque_structs:
                        return (base_conv + "\n" + no_ptr.strip() + "_conv._underlying_ref = false;",
                            "XXX2", no_ptr.strip() + "_conv")
                    return (base_conv, "XXX2", no_ptr.strip() + "_conv")
                else:
                    assert(not is_free)
                    return (is_ptr_to_obj + "* " + no_ptr.strip() + "_conv = (" + is_ptr_to_obj + "*)" + no_ptr.strip() + ";",
                            "XXX2", no_ptr.strip() + "_conv")
            elif no_ptr != fn_arg:
                return ("YYY1", "XXX3", no_ptr.strip())
            else:
                return (None, "XXX4", no_ptr.strip())
        elif not print_void:
            # We don't have a parameter name, and want one, just call it arg
            out_java.write(" arg")
            out_c.write(" arg")
            if is_ptr_to_obj is not None:
                assert(not is_free or is_ptr_to_obj not in opaque_structs);
                return (is_ptr_to_obj + " arg_conv = *(" + is_ptr_to_obj + "*)arg;\nfree((void*)arg);", "XXX2", "arg_conv")
            else:
                assert(not is_free)
                return (None, "XXX6", "arg")
        else:
            # We don't have a parameter name, and don't want one (cause we're returning)
            if is_ptr_to_obj is not None:
                if no_ptr == fn_arg:
                    if is_ptr_to_obj in opaque_structs:
                        # If we're returning a newly-allocated struct, we don't want Rust to ever
                        # free, instead relying on the Java GC to lose the ref. We undo this in
                        # any _free function.
                        # To avoid any issues, we first assert that the incoming object is non-ref.
                        return (None, (is_ptr_to_obj + "* ret = malloc(sizeof(" + is_ptr_to_obj + "));\n*ret = ", ";\nassert(!ret->_underlying_ref);\nret->_underlying_ref = true;\nreturn (long)ret;"), None)
                    else:
                        return (None, (is_ptr_to_obj + "* ret = malloc(sizeof(" + is_ptr_to_obj + "));\n*ret = ", ";\nreturn (long)ret;"), None)
                else:
                    return (None, ("return (long) ", ";"), None)
            else:
                return (None, None, None)

    def map_fn(re_match, ret_arr_len):
        out_java.write("\t/// " + line)
        out_java.write("\tpublic static native ")
        out_c.write("JNIEXPORT ")

        _, ret_conv, _ = map_type(re_match.group(1), True, ret_arr_len, False)
        if ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = ret_conv

        out_java.write(" " + re_match.group(2) + "(")
        out_c.write(" JNICALL Java_org_ldk_impl_bindings_" + re_match.group(2).replace('_', '_1') + "(JNIEnv * _env, jclass _b")

        arg_names = []
        for idx, arg in enumerate(re_match.group(3).split(',')):
            if idx != 0:
                out_java.write(", ")
            if arg != "void":
                out_c.write(", ")
            arg_names.append(map_type(arg, False, None, re_match.group(2).endswith("_free")))

        out_java.write(");\n")
        out_c.write(") {\n")

        for arg_conv, _, _ in arg_names:
            if arg_conv is not None:
                out_c.write("\t" + arg_conv.replace('\n', "\n\t") + "\n");

        if ret_conv is not None:
            out_c.write("\t" + ret_conv_pfx.replace('\n', '\n\t'));
        else:
            out_c.write("\treturn ");

        out_c.write(re_match.group(2) + "(")
        for idx, (_, _, arg) in enumerate(arg_names):
            if arg is not None:
                if idx != 0:
                    out_c.write(", ")
                out_c.write(arg)
        out_c.write(")")
        if ret_conv is not None:
            out_c.write(ret_conv_sfx.replace('\n', '\n\t'))
        else:
            out_c.write(";")
        out_c.write("\n}\n\n")

    out_java.write("""package org.ldk.impl;

public class bindings {
	static {
		System.loadLibrary(\"lightningjni\");
	}

""")
    out_c.write("#include \"org_ldk_impl_bindings.h\"\n")
    out_c.write("#include <rust_types.h>\n")
    out_c.write("#include <lightning.h>\n")
    out_c.write("#include <assert.h>\n\n")
    out_c.write("#include <string.h>\n\n")

    in_block_comment = False
    in_block_enum = False
    cur_block_struct = None
    in_block_union = False

    fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
    fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[([0-9]*)\];$")
    reg_fn_regex = re.compile("([A-Za-z_0-9\* ]* \*?)([a-zA-Z_0-9]*)\((.*)\);$")
    const_val_regex = re.compile("^extern const ([A-Za-z_0-9]*) ([A-Za-z_0-9]*);$")

    line_indicates_opaque_regex = re.compile("^   bool _underlying_ref;$")
    line_indicates_trait_regex = re.compile("^   ([A-Za-z_0-9]* \*?)\(\*([A-Za-z_0-9]*)\)\((const )?void \*this_arg(.*)\);$")
    assert(line_indicates_trait_regex.match("   uintptr_t (*send_data)(void *this_arg, LDKu8slice data, bool resume_read);"))
    assert(line_indicates_trait_regex.match("   LDKCVec_MessageSendEventZ (*get_and_clear_pending_msg_events)(const void *this_arg);"))
    assert(line_indicates_trait_regex.match("   void *(*clone)(const void *this_arg);"))
    struct_name_regex = re.compile("^typedef struct (MUST_USE_STRUCT )?(LDK[A-Za-z_0-9]*) {$")
    assert(struct_name_regex.match("typedef struct LDKCVecTempl_u8 {"))

    for line in in_h:
        if in_block_comment:
            #out_java.write("\t" + line)
            if line.endswith("*/\n"):
                in_block_comment = False
        elif cur_block_struct is not None:
            cur_block_struct  = cur_block_struct + line
            if line.startswith("} "):
                field_lines = []
                struct_name = None
                struct_lines = cur_block_struct.split("\n")
                is_opaque = False
                trait_fn_lines = []

                for idx, struct_line in enumerate(struct_lines):
                    if struct_line.strip().startswith("/*"):
                        in_block_comment = True
                    if in_block_comment:
                        if struct_line.endswith("*/"):
                            in_block_comment = False
                    else:
                        struct_name_match = struct_name_regex.match(struct_line)
                        if struct_name_match is not None:
                            struct_name = struct_name_match.group(2)
                        if line_indicates_opaque_regex.match(struct_line):
                            is_opaque = True
                        trait_fn_match = line_indicates_trait_regex.match(struct_line)
                        if trait_fn_match is not None:
                            trait_fn_lines.append(trait_fn_match)
                        field_lines.append(struct_line)

                assert(struct_name is not None)
                assert(len(trait_fn_lines) == 0 or not is_opaque)
                if is_opaque:
                    opaque_structs.add(struct_name)
                if len(trait_fn_lines) > 0:
                    out_c.write("typedef struct " + struct_name + "_JCalls {\n")
                    out_c.write("\tJNIEnv *env;\n")
                    out_c.write("\tjobject o;\n")
                    for fn_line in trait_fn_lines:
                        if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                            out_c.write("\tjmethodID " + fn_line.group(2) + "_meth;\n")
                    out_c.write("} " + struct_name + "_JCalls;\n")

                    out_java.write("\tpublic interface " + struct_name + " {\n")
                    for fn_line in trait_fn_lines:
                        if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                            (java_ty, c_ty, is_ptr, _) = java_c_types(fn_line.group(1), None)

                            out_java.write("\t\t " + java_ty + " " + fn_line.group(2) + "(")
                            is_const = fn_line.group(3) is not None
                            #if not is_ptr:
                            #    out_c.write(c_ty + " " + fn_line.group(2) + "_jcall(")
                            #else:
                            out_c.write(fn_line.group(1) + fn_line.group(2) + "_jcall(")
                            if is_const:
                                out_c.write("const void* this_arg")
                            else:
                                out_c.write("void* this_arg")

                            #arg_names = []
                            for idx, arg in enumerate(fn_line.group(4).split(',')):
                                if arg == "":
                                    continue
                                if idx >= 2:
                                    out_java.write(", ")
                                out_c.write(", ")
                                #arg_names.append(map_type(arg, True, None, False))
                                out_c.write(arg.strip())
                                (arg_java_ty, arg_c_ty, arg_is_ptr, arg_name) = java_c_types(arg, None)
                                out_java.write(arg_java_ty + " " + arg_name)

                            out_java.write(");\n")
                            out_c.write(") {\n")
                            out_c.write("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")

                            if not is_ptr:
                                out_c.write("\treturn (*j_calls->env)->Call" + java_ty.title() + "Method(j_calls->env, j_calls->o, j_calls->" + fn_line.group(2) + "_meth")
                            else:
                                out_c.write("\t" + fn_line.group(1).strip() + "* ret = (" + fn_line.group(1).strip() + "*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->" + fn_line.group(2) + "_meth");
                            for arg in fn_line.group(4).split(','):
                                if arg == "":
                                    continue
                                (arg_java_ty, arg_c_ty, arg_is_ptr, arg_name) = java_c_types(arg, None)
                                # TODO: Run conversion here!
                                out_c.write(", " + arg_name)
                            out_c.write(");\n");

                            if is_ptr:
                                out_c.write("\t" + fn_line.group(1).strip() + " res = *ret;\n")
                                out_c.write("\tfree(ret);\n")
                                out_c.write("\treturn res;\n")
                            out_c.write("}\n")
                        elif fn_line.group(2) == "free":
                            out_c.write("void " + struct_name + "_JCalls_free(void* this_arg) {\n")
                            out_c.write("\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n")
                            out_c.write("\t(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);\n")
                            out_c.write("\tfree(j_calls);\n")
                            out_c.write("}\n")
                        elif fn_line.group(2) == "clone":
                            out_c.write("void* " + struct_name + "_JCalls_clone(const void* this_arg) {\n")
                            out_c.write("\t" + struct_name + "_JCalls *ret = malloc(sizeof(" + struct_name + "_JCalls));\n")
                            out_c.write("\tmemcpy(ret, this_arg, sizeof(" + struct_name + "_JCalls));\n")
                            out_c.write("\treturn ret;\n")
                            out_c.write("}\n")
                    out_java.write("\t}\n")
                    out_java.write("\tpublic static native long " + struct_name + "_new(" + struct_name + " impl);\n")

                    out_c.write("JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_" + struct_name.replace("_", "_1") + "_1new (JNIEnv * env, jclass _a, jobject o) {\n")
                    out_c.write("\tjclass c = (*env)->GetObjectClass(env, o);\n")
                    out_c.write("\tassert(c != NULL);\n")
                    out_c.write("\t" + struct_name + "_JCalls *calls = malloc(sizeof(" + struct_name + "_JCalls));\n")
                    out_c.write("\tcalls->env = env;\n")
                    out_c.write("\tcalls->o = (*env)->NewGlobalRef(env, o);\n")
                    for fn_line in trait_fn_lines:
                        if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                            out_c.write("\tcalls->" + fn_line.group(2) + "_meth = (*env)->GetMethodID(env, c, \"" + fn_line.group(2) + "\", \"" + "TODO" + "\");\n")
                            out_c.write("\tassert(calls->" + fn_line.group(2) + "_meth != NULL);\n")
                    out_c.write("\n\t" + struct_name + " *ret = malloc(sizeof(" + struct_name + "));\n")
                    out_c.write("\tret->this_arg = (void*) calls;\n")
                    for fn_line in trait_fn_lines:
                        if fn_line.group(2) != "free" and fn_line.group(2) != "clone":
                            out_c.write("\tret->" + fn_line.group(2) + " = " + fn_line.group(2) + "_jcall;\n")
                        elif fn_line.group(2) == "free":
                            out_c.write("\tret->free = " + struct_name + "_JCalls_free;\n")
                        else:
                            out_c.write("\tret->clone = " + struct_name + "_JCalls_clone;\n")
                    out_c.write("\treturn (long)ret;\n")
                    out_c.write("}\n\n")

                    #out_java.write("/* " + "\n".join(field_lines) + "*/\n")
                cur_block_struct = None
        elif in_block_union:
            if line.startswith("} "):
                in_block_union = False
        elif in_block_enum:
            if line.startswith("} "):
                in_block_enum = False
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
                in_block_enum = True
            elif line.startswith("typedef struct "):
                cur_block_struct = line
            elif line.startswith("typedef union "):
                in_block_union = True
            elif line.startswith("typedef "):
                pass
            elif fn_ptr is not None:
                map_fn(fn_ptr, None)
            elif fn_ret_arr is not None:
                map_fn(fn_ret_arr, fn_ret_arr.group(4))
            elif reg_fn is not None:
                map_fn(reg_fn, None)
            elif const_val_regex is not None:
                # TODO Map const variables
                pass
            else:
                assert(line == "\n")

    out_java.write("}\n")
