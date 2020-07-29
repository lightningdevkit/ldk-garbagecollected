#!/usr/bin/env python3
import sys, re

if len(sys.argv) != 4:
    print("USAGE: /path/to/lightning.h /path/to/bindings/output.java /path/to/bindings/output.c")
    sys.exit(1)

with open(sys.argv[1]) as in_h, open(sys.argv[2], "w") as out_java, open(sys.argv[3], "w") as out_c:
    var_is_arr_regex = re.compile("\(\*([A-za-z_]*)\)\[([0-9]*)\]")
    var_ty_regex = re.compile("([A-za-z_0-9]*)(.*)")
    def map_type(fn_arg, print_void, ret_arr_len):
        fn_arg = fn_arg.strip()
        if fn_arg.startswith("MUST_USE_RES "):
            fn_arg = fn_arg[13:]
        if fn_arg.startswith("const "):
            fn_arg = fn_arg[6:]

        c_ty = None
        is_ptr_to_obj = None
        if fn_arg.startswith("void"):
            if print_void:
                out_java.write("void")
                c_ty = "void"
            else:
                return (None, None, None)
            fn_arg = fn_arg.strip("void ")
        elif fn_arg.startswith("bool"):
            out_java.write("boolean")
            c_ty = "jboolean"
            fn_arg = fn_arg.strip("bool ")
        elif fn_arg.startswith("uint8_t"):
            out_java.write("byte")
            c_ty = "jbyte"
            fn_arg = fn_arg.strip("uint8_t ")
        elif fn_arg.startswith("uint32_t"):
            out_java.write("int")
            c_ty = "jint"
            fn_arg = fn_arg.strip("uint32_t ")
        elif fn_arg.startswith("uint64_t"):
            out_java.write("long")
            c_ty = "jlong"
            fn_arg = fn_arg.strip("uint64_t ")
        else:
            ma = var_ty_regex.match(fn_arg)
            out_java.write("long")
            out_c.write("jlong")
            is_ptr_to_obj = ma.group(1)
            fn_arg = ma.group(2)
        if c_ty is not None:
            out_c.write(c_ty)

        var_is_arr = var_is_arr_regex.match(fn_arg)
        no_ptr = fn_arg.replace('*', '')
        if var_is_arr is not None or ret_arr_len is not None:
            out_java.write("[] ")
            out_c.write("Array ")
            if var_is_arr is not None:
                arr_name = var_is_arr.group(1)
                arr_len = var_is_arr.group(2)
                out_java.write(arr_name)
                out_c.write(arr_name)
            else:
                arr_name = "ret"
                arr_len = ret_arr_len
            assert(c_ty == "jbyte")
            return ("unsigned char " + arr_name + "_arr[" + arr_len + "];\n" +
                    "(*_env)->GetByteArrayRegion (_env, """ + arr_name + ", 0, " + arr_len + ", " + arr_name + "_arr);\n" +
                    "unsigned char (*""" + arr_name + "_ref)[" + arr_len + "] = &" + arr_name + "_arr;",
                (c_ty + "Array " + arr_name + "_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0\n" +
                    "(*_env)->SetByteArrayRegion(_env, " + arr_name + "_arr, 0, " + arr_len + ", *",
                    ");\nreturn ret_arr;"),
                arr_name + "_ref")
        elif no_ptr.strip() != "":
            # If we have a parameter name, print it (noting that it may indicate its a pointer)
            out_java.write(" " + no_ptr.strip())
            out_c.write(" " + no_ptr.strip())
            if is_ptr_to_obj is not None:
                if no_ptr == fn_arg:
                    return (is_ptr_to_obj + " " + no_ptr.strip() + "_conv = *(" + is_ptr_to_obj + "*)" + no_ptr.strip() + ";",
                            "XXX2", no_ptr.strip() + "_conv")
                else:
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
                return (is_ptr_to_obj + " arg_conv = *(" + is_ptr_to_obj + "*)arg;", "XXX2", "arg_conv")
            else:
                return (None, "XXX6", "arg")
        else:
            # We don't have a parameter name, and don't want one (cause we're returning)
            if is_ptr_to_obj is not None:
                if no_ptr == fn_arg:
                    return (None, (is_ptr_to_obj + "* ret = malloc(sizeof(" + is_ptr_to_obj + "));\n*ret = ", ";\nreturn (long)ret;"), None)
                else:
                    return (None, ("return (long) ", ";"), None)
            else:
                return (None, None, None)

    def map_fn_args(fn_args, f):
        for idx, arg in enumerate(fn_args.split(',')):
            if idx != 0:
                out_java.write(", ")
            if arg != "void":
                out_c.write(", ")
            map_type(arg, False)

    def map_fn(re_match, ret_arr_len):
        out_java.write("\t/// " + line)
        out_java.write("\tpublic static native ")
        out_c.write("JNIEXPORT ")

        _, ret_conv, _ = map_type(re_match.group(1), True, ret_arr_len)
        if ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = ret_conv

        out_java.write(" " + re_match.group(2).replace('_', '') + "(")
        out_c.write(" JNICALL " + re_match.group(2).replace('_', '') + "(JNIEnv * _env, jclass _b")

        arg_names = []
        for idx, arg in enumerate(re_match.group(3).split(',')):
            if idx != 0:
                out_java.write(", ")
            if arg != "void":
                out_c.write(", ")
            arg_names.append(map_type(arg, False, None))

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

    out_java.write("""package org.ldk;

public class bindings {
	static {
		System.loadLibrary(\"lightning\");
	}

""")
    out_c.write("#include \"org_ldk_bindings.h\"\n")
    out_c.write("#include <rust_types.h>\n\n")
    out_c.write("#include <lightning.h>\n\n")

    in_block_comment = False
    in_block_enum = False
    in_block_struct = False
    in_block_union = False

    fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
    fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[([0-9]*)\];$")
    reg_fn_regex = re.compile("([A-Za-z_0-9\* ]* \*?)([a-zA-Z_0-9]*)\((.*)\);$")

    for line in in_h:
        if in_block_comment:
            #out_java.write("\t" + line)
            if line.endswith("*/\n"):
                in_block_comment = False
        elif in_block_struct:
            if line.startswith("} "):
                in_block_struct = False
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

            if line.startswith("#include <"):
                pass
            elif line.startswith("/*"):
                #out_java.write("\t" + line)
                if not line.endswith("*/\n"):
                    in_block_comment = True
            elif line.startswith("typedef enum "):
                in_block_enum = True
            elif line.startswith("typedef struct "):
                in_block_struct = True
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
            else:
                assert(line == "\n")

    out_java.write("}\n")
