
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Watch extends CommonBase {

                bindings_instance?: bindings.LDKWatch;

                constructor(ptr?: number, arg?: bindings.LDKWatch) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKWatch_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Watch_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: WatchInterface): Watch {
                    const impl_holder: LDKWatchHolder = new LDKWatchHolder();
                    let structImplementation = <bindings.LDKWatch>{
                        // todo: in-line interface filling
                        watch_channel (funding_txo: number, monitor: number): number {
							const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
				funding_txo_hu_conv.ptrs_to.add(this);
							const monitor_hu_conv: ChannelMonitor = new ChannelMonitor(null, monitor);
				monitor_hu_conv.ptrs_to.add(this);
							Result_NoneChannelMonitorUpdateErrZ ret = arg.watch_channel(funding_txo_hu_conv, monitor_hu_conv);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						update_channel (funding_txo: number, update: number): number {
							const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
				funding_txo_hu_conv.ptrs_to.add(this);
							const update_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, update);
				update_hu_conv.ptrs_to.add(this);
							Result_NoneChannelMonitorUpdateErrZ ret = arg.update_channel(funding_txo_hu_conv, update_hu_conv);
				result: number = ret != null ? ret.ptr : 0;
				return result;
						},

						release_pending_monitor_events (): number[] {
							MonitorEvent[] ret = arg.release_pending_monitor_events();
				result: number[] = (number[])Arrays.stream(ret).map(arr_conv_14 -> arr_conv_14 == null ? 0 : arr_conv_14.ptr & ~1).toArray();
				/* TODO 2 MonitorEvent  */;
				return result;
						},

						
                    };
                    impl_holder.held = new Watch (null, structImplementation);
                }
            }

            export interface WatchInterface {
                watch_channel(funding_txo: OutPoint, monitor: ChannelMonitor): Result_NoneChannelMonitorUpdateErrZ;
				update_channel(funding_txo: OutPoint, update: ChannelMonitorUpdate): Result_NoneChannelMonitorUpdateErrZ;
				release_pending_monitor_events(): MonitorEvent[];
				
            }

            class LDKWatchHolder {
                held: Watch;
            }
	public Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor) {
		number ret = bindings.Watch_watch_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, monitor == null ? 0 : monitor.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(monitor);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update) {
		number ret = bindings.Watch_update_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, update == null ? 0 : update.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(update);
		return ret_hu_conv;
	}

	public MonitorEvent[] release_pending_monitor_events() {
		number[] ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		MonitorEvent[] arr_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number arr_conv_14 = ret[o];
			const arr_conv_14_hu_conv: MonitorEvent = new MonitorEvent(null, arr_conv_14);
			arr_conv_14_hu_conv.ptrs_to.add(this);
			arr_conv_14_arr[o] = arr_conv_14_hu_conv;
		}
		return arr_conv_14_arr;
	}

}
