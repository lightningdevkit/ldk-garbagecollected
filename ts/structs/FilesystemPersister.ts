
            
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
	public static FilesystemPersister constructor_new(Uint8Array path_to_channel_data) {
		number ret = bindings.FilesystemPersister_new(path_to_channel_data);
		const ret_hu_conv: FilesystemPersister = new FilesystemPersister(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array get_data_dir() {
		Uint8Array ret = bindings.FilesystemPersister_get_data_dir(this.ptr);
		return ret;
	}

	public static Result_NoneErrorZ constructor_persist_manager(Uint8Array data_dir, ChannelManager manager) {
		number ret = bindings.FilesystemPersister_persist_manager(data_dir, manager == null ? 0 : manager.ptr & ~1);
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(manager);
		return ret_hu_conv;
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
