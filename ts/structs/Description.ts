
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Description extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Description_free(this.ptr);
                    }
                }
	public Description clone() {
		number ret = bindings.Description_clone(this.ptr);
		const ret_hu_conv: Description = new Description(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.Description_hash(this.ptr);
		return ret;
	}

	public boolean eq(Description b) {
		boolean ret = bindings.Description_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public static Result_DescriptionCreationErrorZ constructor_new(String description) {
		number ret = bindings.Description_new(description);
		Result_DescriptionCreationErrorZ ret_hu_conv = Result_DescriptionCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public String into_inner() {
		String ret = bindings.Description_into_inner(this.ptr);
		return ret;
	}

}
