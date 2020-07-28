#!/usr/bin/env python3
import sys, re

if len(sys.argv) != 3:
    print("USAGE: /path/to/lightning.h /path/to/bindings.java")
    sys.exit(1)

with open(sys.argv[1]) as f, open(sys.argv[2], "w") as out_f:
    var_is_arr_regex = re.compile("\(\*([A-za-z_]*)\)\[[0-9]*\]");
    def map_type(fn_arg, print_void):
        fn_arg = fn_arg.strip()
        if fn_arg.startswith("MUST_USE_RES "):
            fn_arg = fn_arg[13:]
        if fn_arg.startswith("const "):
            fn_arg = fn_arg[6:]
        if fn_arg.startswith("void"):
            if print_void:
                out_f.write("void")
            else:
                return
            fn_arg = fn_arg.strip("void ")
        elif fn_arg.startswith("bool"):
            out_f.write("boolean")
            fn_arg = fn_arg.strip("bool ")
        elif fn_arg.startswith("uint8_t"):
            out_f.write("byte")
            fn_arg = fn_arg.strip("uint8_t ")
        elif fn_arg.startswith("uint32_t"):
            out_f.write("int")
            fn_arg = fn_arg.strip("uint32_t ")
        elif fn_arg.startswith("uint64_t"):
            out_f.write("long")
            fn_arg = fn_arg.strip("uint64_t ")
        else:
            out_f.write("long")
            fn_arg = "".join([e + " " for e in fn_arg.split(" ")[1:]]).strip()
        var_is_arr = var_is_arr_regex.match(fn_arg)
        if var_is_arr is not None:
            out_f.write("[] " + var_is_arr.group(1))
        elif fn_arg.strip() != "":
            out_f.write(" " + fn_arg.replace('*', '').strip())
        elif not print_void:
            out_f.write(" arg");

    def map_fn_args(fn_args):
        for idx, arg in enumerate(fn_args.split(',')):
            if idx != 0:
                out_f.write(", ")
            map_type(arg, False)

    def map_fn(re_match, ret_ty_suffix):
        out_f.write("\t/// " + line)
        out_f.write("\tpublic static native ")
        map_type(re_match.group(1), True)
        out_f.write(ret_ty_suffix + " " + re_match.group(2).replace('_', '') + "(")
        map_fn_args(re_match.group(3))
        out_f.write(");\n")

    out_f.write("""package org.ldk;

public class bindings {
	static {
		System.loadLibrary(\"lightning\");
	}

""")

    in_block_comment = False
    in_block_enum = False
    in_block_struct = False
    in_block_union = False

    fn_ptr_regex = re.compile("^extern const ([A-Za-z_0-9\* ]*) \(\*(.*)\)\((.*)\);$")
    fn_ret_arr_regex = re.compile("(.*) \(\*(.*)\((.*)\)\)\[.*\];$")
    reg_fn_regex = re.compile("([A-Za-z_0-9\* ]*) \*?([a-zA-Z_0-9]*)\((.*)\);$")

    for line in f:
        if in_block_comment:
            #out_f.write("\t" + line)
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
                #out_f.write("\t" + line)
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
                map_fn(fn_ptr, "")
            elif fn_ret_arr is not None:
                map_fn(fn_ret_arr, "[]")
            elif reg_fn is not None:
                map_fn(reg_fn, "")
            else:
                assert(line == "\n")

    out_f.write("}\n");
