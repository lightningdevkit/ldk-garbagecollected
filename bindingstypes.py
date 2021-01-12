class TypeInfo:
    def __init__(self, is_native_primitive, rust_obj, java_ty, java_fn_ty_arg, java_hu_ty, c_ty, is_const, passed_as_ptr, is_ptr, var_name, arr_len, arr_access, subty=None):
        self.is_native_primitive = is_native_primitive
        self.rust_obj = rust_obj
        self.java_ty = java_ty
        self.java_hu_ty = java_hu_ty
        self.java_fn_ty_arg = java_fn_ty_arg
        self.c_ty = c_ty
        self.is_const = is_const
        self.passed_as_ptr = passed_as_ptr
        self.is_ptr = is_ptr
        self.var_name = var_name
        self.arr_len = arr_len
        self.arr_access = arr_access
        self.subty = subty
        self.pass_by_ref = is_ptr
        self.requires_clone = None

    def get_full_rust_ty(self):
        ret = ""
        if self.is_const:
            ret = "const "
        if self.rust_obj is not None:
            ret = ret + self.rust_obj
        if self.is_ptr:
            ret = ret + " *"

        if self.arr_len is not None and self.arr_len.isnumeric():
            if self.rust_obj is not None:
                return (ret, "")
            assert self.c_ty.endswith("Array")
            if self.is_const:
                return ("const u" + self.c_ty[:-5] + " (*", ")[" + self.arr_len + "]")
            else:
                return ("u" + self.c_ty[:-5] + " (*", ")[" + self.arr_len + "]")
        if self.rust_obj is None:
            if self.c_ty.startswith("int"):
                # Ironically the entire API uses no signed integers. We really should handle this better, but for now just always add a u
                return ("u" + self.c_ty, "")
            if self.c_ty == "jboolean":
                return ("bool", "")
            return (self.c_ty, "")
        return (ret, "")

class ConvInfo:
    def __init__(self, ty_info, arg_name, arg_conv, arg_conv_name, arg_conv_cleanup, ret_conv, ret_conv_name, to_hu_conv, to_hu_conv_name, from_hu_conv):
        assert(ty_info.c_ty is not None)
        assert(ty_info.java_ty is not None)
        assert(arg_name is not None)
        self.passed_as_ptr = ty_info.passed_as_ptr
        self.rust_obj = ty_info.rust_obj
        self.c_ty = ty_info.c_ty
        self.java_ty = ty_info.java_ty
        self.java_hu_ty = ty_info.java_hu_ty
        self.java_fn_ty_arg = ty_info.java_fn_ty_arg
        self.is_native_primitive = ty_info.is_native_primitive
        self.ty_info = ty_info
        self.arg_name = arg_name
        self.arg_conv = arg_conv
        self.arg_conv_name = arg_conv_name
        self.arg_conv_cleanup = arg_conv_cleanup
        self.ret_conv = ret_conv
        self.ret_conv_name = ret_conv_name
        self.to_hu_conv = to_hu_conv
        self.to_hu_conv_name = to_hu_conv_name
        self.from_hu_conv = from_hu_conv

class TraitMethInfo:
    def __init__(self, fn_name, self_is_const, ret_ty_info, args_ty):
        self.fn_name = fn_name
        self.self_is_const = self_is_const
        self.ret_ty_info = ret_ty_info
        self.args_ty = args_ty

class ComplexEnumVariantInfo:
    def __init__(self, var_name, fields):
        self.var_name = var_name
        self.fields = fields
