from bindingstypes import ConvInfo

class TypeMappingGenerator:

    def __init__(self, java_c_types, consts, opaque_structs, clone_fns, unitary_enums, trait_structs, complex_enums, result_types, tuple_types):
        # trick our way around circular imports
        self.java_c_types = java_c_types
        self.consts = consts
        self.opaque_structs = opaque_structs
        self.clone_fns = clone_fns
        self.unitary_enums = unitary_enums
        self.trait_structs = trait_structs
        self.complex_enums = complex_enums
        self.result_types = result_types
        self.tuple_types = tuple_types

    def map_type(self, fn_arg, print_void, ret_arr_len, is_free, holds_ref):
        ty_info = self.java_c_types(fn_arg, ret_arr_len)
        mapped_info = self.map_type_with_info(ty_info, print_void, ret_arr_len, is_free, holds_ref, False)
        return mapped_info

    def map_nullable_type(self, fn_arg, print_void, ret_arr_len, is_free, holds_ref):
        ty_info = self.java_c_types(fn_arg, ret_arr_len)
        mapped_info = self.map_type_with_info(ty_info, print_void, ret_arr_len, is_free, holds_ref, True)
        return mapped_info

    def map_type_with_info(self, ty_info, print_void, ret_arr_len, is_free, holds_ref, is_nullable):
        mapped_info = self._do_map_type_with_info(ty_info, print_void, ret_arr_len, is_free, holds_ref, is_nullable)
        if is_nullable:
            mapped_info.nullable = True
        return mapped_info

    def _do_map_type_with_info(self, ty_info, print_void, ret_arr_len, is_free, holds_ref, is_nullable):
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
                (set_pfx, set_sfx) = self.consts.set_native_arr_contents(arr_name + "_arr", arr_len, ty_info)
                ret_conv = ("int8_tArray " + arr_name + "_arr = " + self.consts.create_native_arr_call(arr_len, ty_info) + ";\n" + set_pfx, "")
                arg_conv_cleanup = None
                if not arr_len.isdigit():
                    arg_conv = ty_info.rust_obj + " " + arr_name + "_ref;\n"
                    arg_conv = arg_conv + arr_name + "_ref." + arr_len + " = " +  self.consts.get_native_arr_len_call[0] + arr_name + self.consts.get_native_arr_len_call[1] + ";\n"
                    if (not ty_info.is_ptr or not holds_ref) and ty_info.rust_obj != "LDKu8slice":
                        arg_conv = arg_conv + arr_name + "_ref." + ty_info.arr_access + " = MALLOC(" + arr_name + "_ref." + arr_len + ", \"" + ty_info.rust_obj + " Bytes\");\n"
                        arg_conv = arg_conv + self.consts.get_native_arr_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_name + "_ref." + arr_len, ty_info, True) + ";"
                    else:
                        arg_conv = arg_conv + arr_name + "_ref." + ty_info.arr_access + " = " + self.consts.get_native_arr_contents(arr_name, "NO_DEST", arr_name + "_ref." + arr_len, ty_info, False) + ";"
                        arg_conv_cleanup = self.consts.cleanup_native_arr_ref_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_name + "_ref." + arr_len, ty_info)
                    if ty_info.rust_obj == "LDKTransaction" or ty_info.rust_obj == "LDKWitness":
                        arg_conv = arg_conv + "\n" + arr_name + "_ref.data_is_owned = " + str(holds_ref).lower() + ";"
                    ret_conv = (ty_info.rust_obj + " " + arr_name + "_var = ", "")
                    ret_conv = (ret_conv[0], ";\nint8_tArray " + arr_name + "_arr = " + self.consts.create_native_arr_call(arr_name + "_var." + arr_len, ty_info) + ";\n")
                    (pfx, sfx) = self.consts.set_native_arr_contents(arr_name + "_arr", arr_name + "_var." + arr_len, ty_info)
                    ret_conv = (ret_conv[0], ret_conv[1] + pfx + arr_name + "_var." + ty_info.arr_access + sfx + ";")
                    if not holds_ref and ty_info.rust_obj != "LDKu8slice":
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n" + ty_info.rust_obj.replace("LDK", "") + "_free(" + arr_name + "_var);")
                    from_hu_conv = self.consts.primitive_arr_from_hu(ty_info, None, arr_name)
                    to_hu_conv = self.consts.primitive_arr_to_hu(ty_info, None, arr_name, arr_name + "_conv")
                elif ty_info.rust_obj is not None:
                    arg_conv = ty_info.rust_obj + " " + arr_name + "_ref;\n"
                    arg_conv = arg_conv + "CHECK(" + self.consts.get_native_arr_len_call[0] + arr_name + self.consts.get_native_arr_len_call[1] + " == " + arr_len + ");\n"
                    arg_conv = arg_conv + self.consts.get_native_arr_contents(arr_name, arr_name + "_ref." + ty_info.arr_access, arr_len, ty_info, True) + ";"
                    ret_conv = (ret_conv[0], "." + ty_info.arr_access + set_sfx + ";")
                    from_hu_conv = self.consts.primitive_arr_from_hu(ty_info, arr_len, arr_name)
                    to_hu_conv = self.consts.primitive_arr_to_hu(ty_info, None, arr_name, arr_name + "_conv")
                else:
                    arg_conv = "unsigned char " + arr_name + "_arr[" + arr_len + "];\n"
                    arg_conv = arg_conv + "CHECK(" + self.consts.get_native_arr_len_call[0] + arr_name + self.consts.get_native_arr_len_call[1] + " == " + arr_len + ");\n"
                    arg_conv = arg_conv + self.consts.get_native_arr_contents(arr_name, arr_name + "_arr", arr_len, ty_info, True) + ";\n"
                    arg_conv = arg_conv + "unsigned char (*" + arr_name + "_ref)[" + arr_len + "] = &" + arr_name + "_arr;"
                    ret_conv = (ret_conv[0] + "*", set_sfx + ";")
                    from_hu_conv = self.consts.primitive_arr_from_hu(ty_info, arr_len, arr_name)
                    to_hu_conv = self.consts.primitive_arr_to_hu(ty_info, None, arr_name, arr_name + "_conv")
                to_hu_conv_name = None
                if to_hu_conv is not None:
                    to_hu_conv_name = arr_name + "_conv"
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arr_name + "_ref", arg_conv_cleanup = arg_conv_cleanup,
                    ret_conv = ret_conv, ret_conv_name = arr_name + "_arr",
                    to_hu_conv = to_hu_conv, to_hu_conv_name = to_hu_conv_name,
                    from_hu_conv = from_hu_conv)
            else:
                assert not arr_len.isdigit() # fixed length arrays not implemented
                assert ty_info.java_hu_ty[len(ty_info.java_hu_ty) - 2:] == "[]"
                if arr_name == "":
                    arr_name = "ret"
                conv_name = arr_name + "_conv_" + str(len(ty_info.java_hu_ty))
                idxc = chr(ord('a') + (len(ty_info.java_hu_ty) % 26))
                ty_info.subty.var_name = conv_name
                #XXX: We'd really prefer to only ever set to False, avoiding lots of clone, but need smarter free logic
                #if ty_info.is_ptr or holds_ref:
                #    ty_info.subty.requires_clone = False
                ty_info.subty.requires_clone = not ty_info.is_ptr or not holds_ref
                if not ty_info.subty.is_native_primitive and ty_info.subty.rust_obj == "LDKChannelMonitor":
                    # We take a Vec of references to ChannelMonitors as input to ChannelManagerReadArgs, if we clone them,
                    # we end up freeing the clones after creating the ChannelManagerReadArgs before calling the read
                    # function itself, resulting in a segfault. Thus, we manually check and ensure we don't clone for
                    # ChannelMonitors inside of vecs.
                    ty_info.subty.requires_clone = False
                subty = self.map_type_with_info(ty_info.subty, False, None, is_free, holds_ref, False)
                arg_conv = ty_info.rust_obj + " " + arr_name + "_constr;\n"
                pf = ""
                if ty_info.is_ptr:
                    pf = "\t"
                    arg_conv += ty_info.rust_obj + " *" + arr_name + "_ptr = NULL;\n"
                    arg_conv += "if (" + self.consts.is_arr_some_check[0] + arr_name + self.consts.is_arr_some_check[1] + ") {\n"
                arg_conv += pf + arr_name + "_constr." + arr_len + " = " + self.consts.get_native_arr_len_call[0] + arr_name + self.consts.get_native_arr_len_call[1] + ";\n"
                arg_conv += pf + "if (" + arr_name + "_constr." + arr_len + " > 0)\n"
                if subty.is_native_primitive:
                    szof = subty.c_ty
                else:
                    szof = subty.rust_obj
                arg_conv += pf + "\t" + arr_name + "_constr." + ty_info.arr_access + " = MALLOC(" + arr_name + "_constr." + arr_len + " * sizeof(" + szof + "), \"" + ty_info.rust_obj + " Elements\");\n"
                arg_conv += pf + "else\n"
                arg_conv += pf + "\t" + arr_name + "_constr." + ty_info.arr_access + " = NULL;\n"
                get_arr = self.consts.get_native_arr_contents(arr_name, "NO_DEST", arr_name + "_constr." + arr_len, ty_info, False)
                if get_arr != None:
                    arg_conv += pf + subty.c_ty + "* " + arr_name + "_vals = " + get_arr + ";\n"
                arg_conv += pf + "for (size_t " + idxc + " = 0; " + idxc + " < " + arr_name + "_constr." + arr_len + "; " + idxc + "++) {\n"
                if get_arr != None:
                    arg_conv += pf + "\t" + subty.c_ty + " " + conv_name + " = " + arr_name + "_vals[" + idxc + "];"
                    if subty.arg_conv is not None:
                        arg_conv += "\n\t" + pf + subty.arg_conv.replace("\n", "\n\t" + pf)
                else:
                    arg_conv += pf + "\t" + subty.c_ty + " " + conv_name + " = " + self.consts.get_native_arr_elem(arr_name, idxc, ty_info) + ";\n"
                    arg_conv += pf + "\t" + subty.arg_conv.replace("\n", "\n\t" + pf)
                arg_conv += "\n\t" + pf + arr_name + "_constr." + ty_info.arr_access + "[" + idxc + "] = " + subty.arg_conv_name + ";\n" + pf + "}"
                if get_arr != None:
                    cleanup = self.consts.cleanup_native_arr_ref_contents(arr_name, arr_name + "_vals", arr_name + "_constr." + arr_len, ty_info)
                    if cleanup is not None:
                        arg_conv += "\n" + pf + cleanup + ";"
                if ty_info.is_ptr:
                    arg_conv_name = arr_name + "_ptr"
                else:
                    arg_conv_name = arr_name + "_constr"
                arg_conv_cleanup = None
                if ty_info.is_ptr:
                    arg_conv_cleanup = "if (" + arr_name + "_ptr != NULL) { FREE(" + arr_name + "_constr." + ty_info.arr_access + "); }"
                if ty_info.is_ptr:
                    arg_conv += "\n\t" + arr_name + "_ptr = &" + arr_name + "_constr;\n}"

                if is_nullable:
                    ret_conv = (ty_info.rust_obj + " *" + arr_name + "_var_ptr = ", "")
                else:
                    ret_conv = (ty_info.rust_obj + " " + arr_name + "_var = ", "")
                if subty.ret_conv is None:
                    ret_conv = ("DUMMY", "DUMMY")
                else:
                    ret_conv = (ret_conv[0], ";\n" + ty_info.c_ty + " " + arr_name + "_arr = NULL;\n")
                    indent = ""
                    if is_nullable:
                        ret_conv = (ret_conv[0], ret_conv[1] + "if (" + arr_name + " != NULL) {\n")
                        ret_conv = (ret_conv[0], ret_conv[1] + "\t" + ty_info.rust_obj + " " + arr_name + "_var = *" + arr_name + "_var_ptr;\n")
                        indent = "\t"
                    ret_conv = (ret_conv[0], ret_conv[1] + indent + arr_name + "_arr = " + self.consts.create_native_arr_call(arr_name + "_var." + arr_len, ty_info) + ";\n")
                    get_ptr_call = self.consts.get_native_arr_ptr_call(ty_info)
                    if get_ptr_call is not None:
                        ret_conv = (ret_conv[0], ret_conv[1] + indent + subty.c_ty + " *" + arr_name + "_arr_ptr = " + get_ptr_call[0] + arr_name + "_arr" + get_ptr_call[1] + ";\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + indent + "for (size_t " + idxc + " = 0; " + idxc + " < " + arr_name + "_var." + arr_len + "; " + idxc + "++) {\n")
                    ret_conv = (ret_conv[0], ret_conv[1] + indent + "\t" + subty.ret_conv[0].replace("\n", "\n\t" + indent))
                    ret_conv = (ret_conv[0], ret_conv[1] + indent + arr_name + "_var." + ty_info.arr_access + "[" + idxc + "]" + subty.ret_conv[1].replace("\n", "\n\t" + indent) + "\n")
                    if get_ptr_call is not None:
                        ret_conv = (ret_conv[0], ret_conv[1] + indent + "\t" + arr_name + "_arr_ptr[" + idxc + "] = " + subty.ret_conv_name + ";\n" + indent + "}\n")
                    else:
                        ret_conv = (ret_conv[0], ret_conv[1] + indent + "\t" + self.consts.get_native_arr_entry_call(ty_info, arr_name + "_arr", idxc, subty.ret_conv_name) + ";\n" + indent + "}\n")
                    cleanup = self.consts.release_native_arr_ptr_call(ty_info, arr_name + "_arr", arr_name + "_arr_ptr")
                    if cleanup is not None:
                        ret_conv = (ret_conv[0], ret_conv[1] + indent + cleanup + ";")
                    if not holds_ref and not is_nullable:
                        # XXX: The commented if's are a bit smarter freeing, but we need to be a nudge smarter still
                        # Note that we don't drop the full vec here - we're passing ownership to java (or have cloned) or free'd by now!
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n" + indent + "FREE(" + arr_name + "_var." + ty_info.arr_access + ");")
                        #if subty.rust_obj is not None and subty.rust_obj in self.opaque_structs:
                        #    ret_conv = (ret_conv[0], ret_conv[1] + "\nFREE(" + arr_name + "_var." + ty_info.arr_access + ");")
                        #else:
                        #    ret_conv = (ret_conv[0], ret_conv[1] + "\n" + ty_info.rust_obj.replace("LDK", "") + "_free(" + arr_name + "_var);")
                    if is_nullable:
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n}")

                if subty.to_hu_conv is not None:
                    to_hu_conv = self.consts.var_decl_statement(self.consts.c_type_map["uint32_t"][0], conv_name + "_len", self.consts.get_java_arr_len(arr_name)) + ";\n"
                    to_hu_conv += self.consts.var_decl_statement(ty_info.java_hu_ty, conv_name + "_arr", self.consts.constr_hu_array(ty_info, conv_name + "_len"))
                    to_hu_conv += ";\n"
                    pfx = ""
                    if is_nullable:
                        to_hu_conv += "if (" + arr_name + " != null) {\n"
                        pfx = "\t"
                    to_hu_conv += pfx + self.consts.for_n_in_range(idxc, "0", conv_name + "_len") + "\n"

                    to_hu_conv += pfx + "\t" + self.consts.var_decl_statement(subty.java_ty, conv_name, self.consts.get_java_arr_elem(subty, arr_name, idxc)) + ";\n"
                    to_hu_conv += pfx + "\t" + subty.to_hu_conv.replace("\n", "\n\t" + pfx) + "\n"
                    to_hu_conv += pfx + "\t" + conv_name + "_arr[" + idxc + "] = " + subty.to_hu_conv_name + ";\n"
                    to_hu_conv += pfx + "}"
                    if is_nullable:
                        to_hu_conv += "\n}"
                    cleanup = self.consts.cleanup_converted_native_array(ty_info, arr_name)
                    if cleanup is not None:
                        to_hu_conv += "\n" + cleanup
                    to_hu_conv_name = conv_name + "_arr"
                else:
                    to_hu_conv = self.consts.primitive_arr_to_hu(ty_info, None, arr_name, arr_name + "_conv")
                    if to_hu_conv is not None:
                        to_hu_conv_name = arr_name + "_conv"
                    else:
                        to_hu_conv_name = None
                from_hu_conv = self.consts.primitive_arr_from_hu(ty_info, None, arr_name)
                if subty.from_hu_conv is not None:
                    hu_conv_b = ""
                    if subty.from_hu_conv[1] != "":
                        iterator = self.consts.for_n_in_arr(conv_name, arr_name, subty)
                        if is_nullable:
                            hu_conv_b = "if (" + arr_name + " != null) { " + iterator[0] + subty.from_hu_conv[1] + ";" + iterator[1] + " }"
                        else:
                            hu_conv_b = iterator[0] + subty.from_hu_conv[1] + ";" + iterator[1]
                    if from_hu_conv is not None:
                        arr_conv = self.consts.primitive_arr_from_hu(ty_info, None, self.consts.map_hu_array_elems(arr_name, conv_name, ty_info, subty))
                        assert arr_conv[1] == ""
                        from_hu_conv = (arr_conv[0], hu_conv_b)
                    else:
                        from_hu_conv = (self.consts.map_hu_array_elems(arr_name, conv_name, ty_info, subty), hu_conv_b)

                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = arg_conv_cleanup,
                    ret_conv = ret_conv, ret_conv_name = arr_name + "_arr", to_hu_conv = to_hu_conv, to_hu_conv_name = to_hu_conv_name, from_hu_conv = from_hu_conv)
        elif ty_info.java_fn_ty_arg == "Ljava/lang/String;":
            assert not is_nullable
            if not is_free:
                arg_conv = "LDKStr " + ty_info.var_name + "_conv = " + self.consts.str_ref_to_c_call(ty_info.var_name) + ";"
                arg_conv_name = ty_info.var_name + "_conv"
            else:
                arg_conv = "LDKStr dummy = { .chars = NULL, .len = 0, .chars_is_owned = false };"
                arg_conv_name = "dummy"
            if ty_info.arr_access is None:
                assert False
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = None,
                    ret_conv = ("const char* " + ty_info.var_name + "_str = ",
                        ";\njstring " + ty_info.var_name + "_conv = " + self.consts.str_ref_to_native_call(ty_info.var_name + "_str", "strlen(" + ty_info.var_name + "_str)") + ";"),
                    ret_conv_name = ty_info.var_name + "_conv",
                    to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
            else:
                free_str = ""
                if not holds_ref:
                    free_str = "\nStr_free(" + ty_info.var_name + "_str);"
                to_hu_conv = self.consts.str_to_hu_conv(ty_info.var_name)
                to_hu_conv_name = None
                if to_hu_conv is not None:
                    to_hu_conv_name = ty_info.var_name + "_conv"
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = None,
                    ret_conv = ("LDKStr " + ty_info.var_name + "_str = ",
                        ";\njstring " + ty_info.var_name + "_conv = " + self.consts.str_ref_to_native_call(ty_info.var_name + "_str." + ty_info.arr_access, ty_info.var_name + "_str." + ty_info.arr_len) + ";" + free_str),
                    ret_conv_name = ty_info.var_name + "_conv",
                    to_hu_conv=to_hu_conv, to_hu_conv_name=to_hu_conv_name,
                    from_hu_conv = self.consts.str_from_hu_conv(ty_info.var_name))
        elif ty_info.var_name == "" and not print_void:
            # We don't have a parameter name, and want one, just call it arg
            if not ty_info.is_native_primitive:
                assert(not is_free or ty_info.rust_obj not in self.opaque_structs)
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = ty_info.rust_obj + " arg_conv = *(" + ty_info.rust_obj + "*)untag_ptr(arg);\nFREE(untag_ptr(arg));",
                    arg_conv_name = "arg_conv", arg_conv_cleanup = None,
                    ret_conv = None, ret_conv_name = None, to_hu_conv = "TODO 7", to_hu_conv_name = None, from_hu_conv = None)
            else:
                assert(not is_free)
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = None, arg_conv_name = "arg", arg_conv_cleanup = None,
                    ret_conv = None, ret_conv_name = None, to_hu_conv = "TODO 8", to_hu_conv_name = None, from_hu_conv = None)
        elif ty_info.is_native_primitive and ty_info.c_ty != "void":
            assert not is_nullable
            return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                arg_conv = None, arg_conv_name =  ty_info.var_name, arg_conv_cleanup = None,
                ret_conv = (ty_info.c_ty + " " + ty_info.var_name + "_conv = ", ";"), ret_conv_name = ty_info.var_name + "_conv",
                to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
        elif ty_info.c_ty == "void":
            assert ty_info.is_native_primitive
            assert not is_nullable
            return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                arg_conv = None, arg_conv_name =  ty_info.var_name, arg_conv_cleanup = None,
                ret_conv = None, ret_conv_name = ty_info.var_name,
                to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
        else:
            if ty_info.var_name == "":
                ty_info.var_name = "ret"

            if ty_info.rust_obj in self.opaque_structs:
                from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + self.consts.get_ptr(ty_info.var_name), self.consts.add_ref("this", ty_info.var_name))
                opaque_arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv;\n"
                opaque_arg_conv = opaque_arg_conv + ty_info.var_name + "_conv.inner = untag_ptr(" + ty_info.var_name + ");\n"
                opaque_arg_conv += ty_info.var_name + "_conv.is_owned = ptr_is_owned(" + ty_info.var_name + ");\n"
                opaque_arg_conv += "CHECK_INNER_FIELD_ACCESS_OR_NULL(" + ty_info.var_name + "_conv);"

                if not is_free and (not ty_info.is_ptr or not holds_ref or ty_info.requires_clone == True) and ty_info.requires_clone != False:
                    if (ty_info.rust_obj.replace("LDK", "") + "_clone") in self.clone_fns:
                        # TODO: This is a bit too naive, even with the checks above, we really need to know if rust wants a ref or not, not just if its pass as a ptr.
                        # arg_conv is used when converting a function argument from java normally (with holds_ref set),
                        # and when converting a java value being returned from a trait method (with holds_ref unset).
                        # In the second case, we need to clone before returning to C (as once we return the GC can free the object),
                        # whereas in the first we prefer to clone in C to avoid additional Java code as much as possible.
                        if holds_ref:
                            opaque_arg_conv += "\n" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&" + ty_info.var_name + "_conv);"
                        else:
                            from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + ty_info.var_name + ".clone_ptr()", "")
                    elif ty_info.passed_as_ptr:
                        opaque_arg_conv += "\n// WARNING: we need a move here but no clone is available for " + ty_info.rust_obj + "\n"
                        # TODO: Once we support features cloning (which just isn't in C yet), we can make this a compile error instead!
                        from_hu_conv = (from_hu_conv[0], from_hu_conv[1] + ";\n" +
                            "// Due to rust's strict-ownership memory model, in some cases we need to \"move\"\n" +
                            "// an object to pass exclusive ownership to the function being called.\n" +
                            "// In most cases, we avoid this being visible in GC'd languages by cloning the object\n" +
                            "// at the FFI layer, creating a new object which Rust can claim ownership of\n" +
                            "// However, in some cases (eg here), there is no way to clone an object, and thus\n" +
                            "// we actually have to pass full ownership to Rust.\n" +
                            "// Thus, after this call, " + ty_info.var_name + " is reset to null and is now a dummy object.\n" + self.consts.set_null_skip_free(ty_info.var_name))
                elif not is_free:
                    opaque_arg_conv += "\n" + ty_info.var_name + "_conv.is_owned = false;"

                opaque_ret_conv_suf = ";\n"
                opaque_ret_conv_suf += self.consts.ptr_c_ty + " " + ty_info.var_name + "_ref = 0;\n"
                if not holds_ref and ty_info.is_ptr and (ty_info.rust_obj.replace("LDK", "") + "_clone") in self.clone_fns: # is_ptr, not holds_ref implies passing a pointed-to value to java, which needs copied
                    opaque_ret_conv_suf += ty_info.var_name + "_var = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&" + ty_info.var_name + "_var);\n"
                elif not holds_ref and ty_info.is_ptr:
                    opaque_ret_conv_suf += "// WARNING: we may need a move here but no clone is available for " + ty_info.rust_obj + "\n"

                opaque_ret_conv_suf += "CHECK_INNER_FIELD_ACCESS_OR_NULL(" + ty_info.var_name + "_var);\n"
                if holds_ref:
                    opaque_ret_conv_suf += ty_info.var_name + "_ref = tag_ptr(" + ty_info.var_name + "_var.inner, false);"
                else:
                    opaque_ret_conv_suf += ty_info.var_name + "_ref = tag_ptr(" + ty_info.var_name + "_var.inner, " + ty_info.var_name + "_var.is_owned);"

                to_hu_conv_sfx = ""
                if not ty_info.is_ptr or holds_ref:
                    to_hu_conv_sfx = "\n" + self.consts.add_ref(ty_info.var_name + "_hu_conv", "this") + ";"
                qualified_hu_ty = self.consts.fully_qualified_hu_ty_path(ty_info)
                if ty_info.is_ptr:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = opaque_arg_conv, arg_conv_name = "&" + ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = (ty_info.rust_obj + " " + ty_info.var_name + "_var = *", opaque_ret_conv_suf),
                        ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = self.consts.to_hu_conv_templates['ptr'].replace('{human_type}', qualified_hu_ty).replace('{var_name}', ty_info.var_name) + to_hu_conv_sfx,
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = from_hu_conv)
                else:
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = opaque_arg_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = (ty_info.rust_obj + " " + ty_info.var_name + "_var = ", opaque_ret_conv_suf),
                        ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = self.consts.to_hu_conv_templates['default'].replace('{human_type}', qualified_hu_ty).replace('{var_name}', ty_info.var_name) + to_hu_conv_sfx,
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = from_hu_conv)

            assert not is_nullable
            if not ty_info.is_ptr:
                if ty_info.rust_obj in self.unitary_enums:
                    (ret_pfx, ret_sfx) = self.consts.c_unitary_enum_to_native_call(ty_info)
                    (arg_pfx, arg_sfx) = self.consts.native_unitary_enum_to_c_call(ty_info)
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = ty_info.rust_obj + " " + ty_info.var_name + "_conv = " + arg_pfx + ty_info.var_name + arg_sfx + ";",
                        arg_conv_name = ty_info.var_name + "_conv",
                        arg_conv_cleanup = None,
                        ret_conv = (ty_info.c_ty + " " + ty_info.var_name + "_conv = " + ret_pfx, ret_sfx + ";"),
                        ret_conv_name = ty_info.var_name + "_conv", to_hu_conv = None, to_hu_conv_name = None, from_hu_conv = None)
                base_conv = "void* " + ty_info.var_name + "_ptr = untag_ptr(" + ty_info.var_name + ");\n"
                base_conv += "CHECK_ACCESS(" + ty_info.var_name + "_ptr);\n"
                base_conv += ty_info.rust_obj + " " + ty_info.var_name + "_conv = *(" + ty_info.rust_obj + "*)(" + ty_info.var_name + "_ptr);"
                from_hu_conv = None
                if ty_info.rust_obj in self.trait_structs:
                    ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_ret = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_ret = ", ";")
                    if holds_ref:
                        if (ty_info.rust_obj.replace("LDK", "") + "_clone") in self.clone_fns:
                            ret_conv = (ret_conv[0] + ty_info.rust_obj.replace("LDK", "") + "_clone(&", ");")
                        else:
                            ret_conv = (ret_conv[0], ";\n// WARNING: We likely need to clone here, but no clone is available, so we just do it for Java instances")
                            ret_conv = (ret_conv[0], ret_conv[1] + "" + self.consts.trait_struct_inc_refcnt(ty_info).replace(ty_info.var_name + "_conv", "(*" + ty_info.var_name + "_ret)"))
                    if not is_free:
                        needs_full_clone = not is_free and (not ty_info.is_ptr and not holds_ref or ty_info.requires_clone == True) and ty_info.requires_clone != False
                        if needs_full_clone and (ty_info.rust_obj.replace("LDK", "") + "_clone") in self.clone_fns:
                            # arg_conv is used when converting a function argument from java normally (with holds_ref set),
                            # and when converting a java value being returned from a trait method (with holds_ref unset).
                            # In the second case, we need to clone before returning to C (as once we return the GC can free the object),
                            # whereas in the first we prefer to clone in C to avoid additional Java code as much as possible.
                            if holds_ref:
                                base_conv += "\n" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(&" + ty_info.var_name + "_conv);"
                            else:
                                from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + ty_info.var_name + ".clone_ptr()", "")
                                base_conv += "\n" + "FREE(untag_ptr(" + ty_info.var_name + "));"
                        else:
                            base_conv = base_conv + self.consts.trait_struct_inc_refcnt(ty_info)
                            if needs_full_clone:
                                base_conv += "// WARNING: we may need a move here but no clone is available for " + ty_info.rust_obj + "\n"
                    else:
                        base_conv = base_conv + "\n" + "FREE(untag_ptr(" + ty_info.var_name + "));"
                    if from_hu_conv is None:
                        from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + self.consts.get_ptr(ty_info.var_name), "")
                    from_hu_conv = (from_hu_conv[0], self.consts.add_ref("this", ty_info.var_name))
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = "tag_ptr(" + ty_info.var_name + "_ret, true)",
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, "ret_hu_conv", "new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ")") + ";\n" + self.consts.add_ref("ret_hu_conv", "this") + ";",
                        to_hu_conv_name = "ret_hu_conv", from_hu_conv = from_hu_conv)
                needs_full_clone = not is_free and (not ty_info.is_ptr or ty_info.requires_clone == True) and ty_info.requires_clone != False
                if needs_full_clone:
                    if "res" in ty_info.var_name: # XXX: This is a stupid hack
                        needs_full_clone = False
                    if needs_full_clone and (ty_info.rust_obj.replace("LDK", "") + "_clone") in self.clone_fns:
                        # arg_conv is used when converting a function argument from java normally (with holds_ref set),
                        # and when converting a java value being returned from a trait method (with holds_ref unset).
                        # In the second case, we need to clone before returning to C (as once we return the GC can free the object),
                        # whereas in the first we prefer to clone in C to avoid additional Java code as much as possible.
                        if holds_ref:
                            base_conv += "\n" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone((" + ty_info.rust_obj + "*)untag_ptr(" + ty_info.var_name + "));"
                        else:
                            from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + ty_info.var_name + ".clone_ptr()", "")
                            base_conv += "\n" + "FREE(untag_ptr(" + ty_info.var_name + "));"
                    elif needs_full_clone:
                        base_conv = base_conv + "\n// WARNING: we may need a move here but no clone is available for " + ty_info.rust_obj
                if not needs_full_clone and ty_info.rust_obj != "LDKu8slice" and (not holds_ref or is_free):
                    # Don't bother free'ing slices passed in - Rust doesn't auto-free the
                    # underlying unlike Vecs, and it gives Java more freedom.
                    base_conv = base_conv + "\nFREE(untag_ptr(" + ty_info.var_name + "));"
                if ty_info.rust_obj in self.complex_enums:
                    to_hu_conv_sfx = ""
                    if needs_full_clone and (ty_info.rust_obj.replace("LDK", "") + "_clone") not in self.clone_fns:
                        # We really need a full clone here, but for now we just implement
                        # a manual clone explicitly for Option<Trait>s
                        if ty_info.contains_trait:
                            assert ty_info.rust_obj.startswith("LDKCOption") # We don't support contained traits for anything else yet
                            optional_ty = ty_info.rust_obj[11:-1]
                            assert "LDK" + optional_ty in self.trait_structs # We don't support contained traits for anything else yet
                            to_hu_conv_sfx = self.consts.add_ref("this", ty_info.var_name)
                            base_conv += "\nif (" + ty_info.var_name + "_conv.tag == " + ty_info.rust_obj + "_Some) {"
                            base_conv += "\n\t// Manually implement clone for Java trait instances"
                            optional_ty_info = self.java_c_types("LDK" + optional_ty + " " + ty_info.var_name, None)
                            base_conv += self.consts.trait_struct_inc_refcnt(optional_ty_info).\
                                replace("\n", "\n\t").replace(ty_info.var_name + "_conv", ty_info.var_name + "_conv.some")
                            base_conv += "\n}"
                    ret_conv = (self.consts.ptr_c_ty + " " + ty_info.var_name + "_ref = tag_ptr(&", ", false);")
                    if not holds_ref:
                        ret_conv = (ty_info.rust_obj + " *" + ty_info.var_name + "_copy = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n", "")
                        ret_conv = (ret_conv[0] + "*" + ty_info.var_name + "_copy = ", "")
                        ret_conv = (ret_conv[0], ";\n" + self.consts.ptr_c_ty + " " + ty_info.var_name + "_ref = tag_ptr(" + ty_info.var_name + "_copy, true);")
                    if from_hu_conv is None:
                        from_hu_conv = (self.consts.get_ptr(ty_info.var_name), "")
                    from_hu_conv = (from_hu_conv[0], to_hu_conv_sfx)
                    fully_qualified_ty = self.consts.fully_qualified_hu_ty_path(ty_info)
                    to_hu_call = fully_qualified_ty + ".constr_from_ptr(" + ty_info.var_name + ")"
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = ty_info.var_name + "_ref",
                        to_hu_conv = self.consts.var_decl_statement(fully_qualified_ty, ty_info.var_name + "_hu_conv", to_hu_call) + ";\n" + self.consts.add_ref(ty_info.var_name + "_hu_conv", "this") + ";",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv", from_hu_conv = from_hu_conv)
                if ty_info.rust_obj in self.result_types:
                    if holds_ref:
                        # If we're trying to return a ref, we have to clone.
                        # We just blindly assume its implemented and let the compiler fail if its not.
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                        ret_conv = (ret_conv[0], ret_conv[1] + "\n*" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(" + ty_info.var_name + "_conv);")
                    else:
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                    if from_hu_conv is None:
                        from_hu_conv = (ty_info.var_name + " != null ? " + self.consts.get_ptr(ty_info.var_name) + " : " + self.consts.native_zero_ptr, "")
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = "tag_ptr(" + ty_info.var_name + "_conv, true)",
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_hu_conv", ty_info.java_hu_ty + ".constr_from_ptr(" + ty_info.var_name + ")") + ";",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv", from_hu_conv = from_hu_conv)
                if ty_info.rust_obj in self.tuple_types:
                    ret_conv_name = "tag_ptr(" + ty_info.var_name + "_conv, "
                    if holds_ref:
                        # If we're trying to return a ref, we have to clone.
                        if (ty_info.rust_obj.replace("LDK", "") + "_clone") not in self.clone_fns:
                            ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = &", "")
                            ret_conv = (ret_conv[0], ";\n// WARNING: we really need to clone here, but no clone is available for " + ty_info.rust_obj)
                            ret_conv_name += "false)"
                        else:
                            ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                            ret_conv = (ret_conv[0], ret_conv[1] + "\n*" + ty_info.var_name + "_conv = " + ty_info.rust_obj.replace("LDK", "") + "_clone(" + ty_info.var_name + "_conv);")
                            ret_conv_name += "true)"
                    else:
                        ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_conv = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_conv = ", ";")
                        ret_conv_name += "true)"
                    if not ty_info.is_ptr or holds_ref:
                        to_hu_conv_sfx = "\n" + self.consts.add_ref(ty_info.var_name + "_hu_conv", "this") + ";"
                    else:
                        to_hu_conv_sfx = ""
                    if from_hu_conv is None:
                        from_hu_conv = (ty_info.var_name + " != null ? " + self.consts.get_ptr(ty_info.var_name) + " : " + self.consts.native_zero_ptr, "")
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = ret_conv_name,
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_hu_conv", "new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ")") + ";" + to_hu_conv_sfx,
                        to_hu_conv_name = ty_info.var_name + "_hu_conv", from_hu_conv = from_hu_conv)

                # The manually-defined types - TxOut, BigEndianScalar, U5, and Error
                if ty_info.rust_obj == "LDKError":
                    assert from_hu_conv is None
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = "", arg_conv_name = "(LDKError){ ._dummy = 0 }", arg_conv_cleanup = None,
                        ret_conv = ("/*", "*/"), ret_conv_name = "0",
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_conv", "new " + ty_info.java_hu_ty + "(" + ty_info.var_name + ")") + ";",
                        to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = ("0", ""))

                if ty_info.rust_obj == "LDKU5" or ty_info.rust_obj == "LDKWitnessVersion":
                    assert from_hu_conv is None
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = "", arg_conv_name = "(" + ty_info.rust_obj + "){ ._0 = " + ty_info.var_name + " }", arg_conv_cleanup = None,
                        ret_conv = ("uint8_t " + ty_info.var_name + "_val = ", "._0;"), ret_conv_name = ty_info.var_name + "_val",
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_conv", "new " + ty_info.java_hu_ty + "(" + ty_info.var_name + ")") + ";",
                        to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = (ty_info.var_name + ".getVal()", ""))

                assert ty_info.rust_obj == "LDKTxOut" or ty_info.rust_obj == "LDKBigEndianScalar"
                if not ty_info.is_ptr and not holds_ref:
                    ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_ref = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n*" + ty_info.var_name + "_ref = ", ";")
                    ret_conv_name = "tag_ptr(" + ty_info.var_name + "_ref, true)"
                else:
                    ret_conv = (ty_info.rust_obj + "* " + ty_info.var_name + "_ref = &", ";")
                    ret_conv_name = "tag_ptr(" + ty_info.var_name + "_ref, false)"
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = base_conv, arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                    ret_conv = ret_conv, ret_conv_name = ret_conv_name,
                    to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_conv", "new " +ty_info.java_hu_ty + "(null, " + ty_info.var_name + ")") + ";",
                    to_hu_conv_name = ty_info.var_name + "_conv", from_hu_conv = (self.consts.get_ptr(ty_info.var_name), ""))
            elif ty_info.is_ptr:
                assert(not is_free)
                if ty_info.rust_obj in self.complex_enums:
                    ret_conv = (self.consts.ptr_c_ty + " ref_" + ty_info.var_name + " = tag_ptr(", ", false); // WARNING: We should clone here!")
                    from_hu_sfx = self.consts.add_ref("this", ty_info.var_name)
                    if ty_info.rust_obj.replace("LDK", "") + "_clone" in self.clone_fns:
                        ret_conv_pfx = ty_info.rust_obj + " *ret_" + ty_info.var_name + " = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + " ret conversion\");\n"
                        ret_conv_pfx += "*ret_" + ty_info.var_name + " = " + ty_info.rust_obj.replace("LDK", "") + "_clone("
                        ret_conv_sfx = ");\n" + self.consts.ptr_c_ty + " ref_" + ty_info.var_name + " = tag_ptr(ret_" + ty_info.var_name + ", true);"
                        ret_conv = (ret_conv_pfx, ret_conv_sfx)
                        from_hu_sfx = ""
                    return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                        arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)untag_ptr(" + ty_info.var_name + ");",
                        arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                        ret_conv = ret_conv, ret_conv_name = "ref_" + ty_info.var_name,
                        to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, ty_info.var_name + "_hu_conv", ty_info.java_hu_ty + ".constr_from_ptr(" + ty_info.var_name + ")") + ";",
                        to_hu_conv_name = ty_info.var_name + "_hu_conv",
                        from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + self.consts.get_ptr(ty_info.var_name), from_hu_sfx))
                elif ty_info.rust_obj in self.trait_structs:
                    if ty_info.nonnull_ptr:
                        arg_conv = "void* " + ty_info.var_name + "_ptr = untag_ptr(" + ty_info.var_name + ");\n"
                        arg_conv += "if (ptr_is_owned(" + ty_info.var_name + ")) { CHECK_ACCESS(" + ty_info.var_name + "_ptr); }\n"
                        arg_conv += ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)" + ty_info.var_name + "_ptr;"
                        arg_conv_name = ty_info.var_name + "_conv"
                    else:
                        # We map Option<Trait> as *mut Trait, which we can differentiate from &Trait by the NONNULL_PTR annotation.
                        # We handle the Option<Trait> case here.
                        arg_conv = ty_info.rust_obj + " *" + ty_info.var_name + "_conv_ptr = NULL;\n"
                        arg_conv += "if (" + ty_info.var_name + " != 0) {\n"
                        arg_conv += "\t" + ty_info.rust_obj + " " + ty_info.var_name + "_conv;\n"
                        arg_conv += "void* " + ty_info.var_name + "_ptr = untag_ptr(" + ty_info.var_name + ");\n"
                        arg_conv += "CHECK_ACCESS(" + ty_info.var_name + "_ptr);\n"
                        arg_conv += "\t" + ty_info.var_name + "_conv = *(" + ty_info.rust_obj + "*)" + ty_info.var_name + "_ptr;"
                        arg_conv += self.consts.trait_struct_inc_refcnt(ty_info).replace("\n", "\n\t")
                        arg_conv += "\n\t" + ty_info.var_name + "_conv_ptr = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n"
                        arg_conv += "\t*" + ty_info.var_name + "_conv_ptr = " + ty_info.var_name + "_conv;\n"
                        arg_conv += "}"
                        arg_conv_name = ty_info.var_name + "_conv_ptr"
                    if ty_info.rust_obj.replace("LDK", "") + "_clone" in self.clone_fns:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = None,
                            ret_conv = (ty_info.rust_obj + " *" + ty_info.var_name + "_clone = MALLOC(sizeof(" + ty_info.rust_obj + "), \"" + ty_info.rust_obj + "\");\n" +
                                "*" + ty_info.var_name + "_clone = " + ty_info.rust_obj.replace("LDK", "") + "_clone(", ");"),
                            ret_conv_name = "tag_ptr(" + ty_info.var_name + "_clone, true)",
                            to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, "ret_hu_conv", "new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ")") + ";\n" + self.consts.add_ref("ret_hu_conv", "this") + ";",
                            to_hu_conv_name = "ret_hu_conv",
                            from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + self.consts.get_ptr(ty_info.var_name), ""))
                    else:
                        return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                            arg_conv = arg_conv, arg_conv_name = arg_conv_name, arg_conv_cleanup = None,
                            ret_conv = ("// WARNING: This object doesn't live past this scope, needs clone!\n" + self.consts.ptr_c_ty + " ret_" + ty_info.var_name + " = tag_ptr(", ", false);"),
                            ret_conv_name = "ret_" + ty_info.var_name,
                            to_hu_conv = self.consts.var_decl_statement(ty_info.java_hu_ty, "ret_hu_conv", "new " + ty_info.java_hu_ty + "(null, " + ty_info.var_name + ")") + ";\n" + self.consts.add_ref("ret_hu_conv", "this") + ";",
                            to_hu_conv_name = "ret_hu_conv",
                            from_hu_conv = (ty_info.var_name + " == null ? " + self.consts.native_zero_ptr + " : " + self.consts.get_ptr(ty_info.var_name), self.consts.add_ref("this", ty_info.var_name)))
                ret_conv = (self.consts.ptr_c_ty + " ret_" + ty_info.var_name + " = tag_ptr(", ", true);")
                if holds_ref:
                    ret_conv = (ret_conv[0], ", false);")
                return ConvInfo(ty_info = ty_info, arg_name = ty_info.var_name,
                    arg_conv = ty_info.rust_obj + "* " + ty_info.var_name + "_conv = (" + ty_info.rust_obj + "*)untag_ptr(" + ty_info.var_name + ");",
                    arg_conv_name = ty_info.var_name + "_conv", arg_conv_cleanup = None,
                    ret_conv = ret_conv, ret_conv_name = "ret_" + ty_info.var_name,
                    to_hu_conv = "TODO 3", to_hu_conv_name = None, from_hu_conv = None) # its a pointer, no conv needed
            assert False # We should have handled every case by now.
