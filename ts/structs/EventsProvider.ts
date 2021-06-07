
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class EventsProvider extends CommonBase {

                bindings_instance?: bindings.LDKEventsProvider;

                constructor(ptr?: number, arg?: bindings.LDKEventsProvider) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKEventsProvider_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.EventsProvider_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: EventsProviderInterface): EventsProvider {
                    const impl_holder: LDKEventsProviderHolder = new LDKEventsProviderHolder();
                    let structImplementation = <bindings.LDKEventsProvider>{
                        // todo: in-line interface filling
                        process_pending_events (handler: number): void {
							EventHandler ret_hu_conv = new EventHandler(null, handler);
				ret_hu_conv.ptrs_to.add(this);
							arg.process_pending_events(ret_hu_conv);
						},

						
                    };
                    impl_holder.held = new EventsProvider (null, structImplementation);
                }
            }

            export interface EventsProviderInterface {
                process_pending_events(handler: EventHandler): void;
				
            }

            class LDKEventsProviderHolder {
                held: EventsProvider;
            }
	public void process_pending_events(EventHandler handler) {
		bindings.EventsProvider_process_pending_events(this.ptr, handler == null ? 0 : handler.ptr);
		this.ptrs_to.add(handler);
	}

}
