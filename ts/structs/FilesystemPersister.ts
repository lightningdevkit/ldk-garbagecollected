
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class FilesystemPersister extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.FilesystemPersister_free(this.ptr);
                    }
                }
	public static FilesystemPersister constructor_new(String path_to_channel_data) {
		number ret = bindings.FilesystemPersister_new(path_to_channel_data);
		const ret_hu_conv: FilesystemPersister = new FilesystemPersister(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public String get_data_dir() {
		String ret = bindings.FilesystemPersister_get_data_dir(this.ptr);
		return ret;
	}

	public Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ read_channelmonitors(KeysInterface keys_manager) {
		number ret = bindings.FilesystemPersister_read_channelmonitors(this.ptr, keys_manager == null ? 0 : keys_manager.ptr);
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

	public Persist as_Persist() {
		number ret = bindings.FilesystemPersister_as_Persist(this.ptr);
		Persist ret_hu_conv = new Persist(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
