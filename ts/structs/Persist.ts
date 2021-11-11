
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Persist extends CommonBase {

                bindings_instance?: bindings.LDKPersist;

                constructor(ptr?: number, arg?: bindings.LDKPersist) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKPersist_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Persist_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: PersistInterface): Persist {
                    const impl_holder: LDKPersistHolder = new LDKPersistHolder();
                    let structImplementation = <bindings.LDKPersist>{
                        // todo: in-line interface filling
                        persist_new_channel (channel_id: number, data: number, update_id: number): number {
							const channel_id_hu_conv: OutPoint = new OutPoint(null, channel_id);
				channel_id_hu_conv.ptrs_to.add(this);
							const data_hu_conv: ChannelMonitor = new ChannelMonitor(null, data);
							const update_id_hu_conv: MonitorUpdateId = new MonitorUpdateId(null, update_id);
				update_id_hu_conv.ptrs_to.add(this);
							Result_NoneChannelMonitorUpdateErrZ ret = arg.persist_new_channel(channel_id_hu_conv, data_hu_conv, update_id_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						update_persisted_channel (channel_id: number, update: number, data: number, update_id: number): number {
							const channel_id_hu_conv: OutPoint = new OutPoint(null, channel_id);
				channel_id_hu_conv.ptrs_to.add(this);
							const update_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, update);
							const data_hu_conv: ChannelMonitor = new ChannelMonitor(null, data);
							const update_id_hu_conv: MonitorUpdateId = new MonitorUpdateId(null, update_id);
				update_id_hu_conv.ptrs_to.add(this);
							Result_NoneChannelMonitorUpdateErrZ ret = arg.update_persisted_channel(channel_id_hu_conv, update_hu_conv, data_hu_conv, update_id_hu_conv);
				result: number = ret == null ? 0 : ret.clone_ptr();
				return result;
						},

						
                    };
                    impl_holder.held = new Persist (null, structImplementation);
                }
            }

            export interface PersistInterface {
                persist_new_channel(channel_id: OutPoint, data: ChannelMonitor, update_id: MonitorUpdateId): Result_NoneChannelMonitorUpdateErrZ;
				update_persisted_channel(channel_id: OutPoint, update: ChannelMonitorUpdate, data: ChannelMonitor, update_id: MonitorUpdateId): Result_NoneChannelMonitorUpdateErrZ;
				
            }

            class LDKPersistHolder {
                held: Persist;
            }
	public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint channel_id, ChannelMonitor data, MonitorUpdateId update_id) {
		number ret = bindings.Persist_persist_new_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr & ~1, data == null ? 0 : data.ptr & ~1, update_id == null ? 0 : update_id.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint channel_id, ChannelMonitorUpdate update, ChannelMonitor data, MonitorUpdateId update_id) {
		number ret = bindings.Persist_update_persisted_channel(this.ptr, channel_id == null ? 0 : channel_id.ptr & ~1, update == null ? 0 : update.ptr & ~1, data == null ? 0 : data.ptr & ~1, update_id == null ? 0 : update_id.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(update);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

}
