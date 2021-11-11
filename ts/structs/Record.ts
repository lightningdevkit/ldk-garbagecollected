
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Record extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Record_free(this.ptr);
                    }
                }
	public Level get_level() {
		Level ret = bindings.Record_get_level(this.ptr);
		return ret;
	}

	public void set_level(Level val) {
		bindings.Record_set_level(this.ptr, val);
	}

	public String get_args() {
		String ret = bindings.Record_get_args(this.ptr);
		return ret;
	}

	public void set_args(String val) {
		bindings.Record_set_args(this.ptr, val);
	}

	public String get_module_path() {
		String ret = bindings.Record_get_module_path(this.ptr);
		return ret;
	}

	public void set_module_path(String val) {
		bindings.Record_set_module_path(this.ptr, val);
	}

	public String get_file() {
		String ret = bindings.Record_get_file(this.ptr);
		return ret;
	}

	public void set_file(String val) {
		bindings.Record_set_file(this.ptr, val);
	}

	public number get_line() {
		number ret = bindings.Record_get_line(this.ptr);
		return ret;
	}

	public void set_line(number val) {
		bindings.Record_set_line(this.ptr, val);
	}

	public number clone_ptr() {
		number ret = bindings.Record_clone_ptr(this.ptr);
		return ret;
	}

	public Record clone() {
		number ret = bindings.Record_clone(this.ptr);
		const ret_hu_conv: Record = new Record(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
