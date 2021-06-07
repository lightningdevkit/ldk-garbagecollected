
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class EventHandler extends CommonBase {

                bindings_instance?: bindings.LDKEventHandler;

                constructor(ptr?: number, arg?: bindings.LDKEventHandler) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKEventHandler_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.EventHandler_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: EventHandlerInterface): EventHandler {
                    const impl_holder: LDKEventHandlerHolder = new LDKEventHandlerHolder();
                    let structImplementation = <bindings.LDKEventHandler>{
                        // todo: in-line interface filling
                        handle_event (event: number): void {
							Event event_hu_conv = Event.constr_from_ptr(event);
				event_hu_conv.ptrs_to.add(this);
							arg.handle_event(event_hu_conv);
						},

						
                    };
                    impl_holder.held = new EventHandler (null, structImplementation);
                }
            }

            export interface EventHandlerInterface {
                handle_event(event: Event): void;
				
            }

            class LDKEventHandlerHolder {
                held: EventHandler;
            }
	public void handle_event(Event event) {
		bindings.EventHandler_handle_event(this.ptr, event.ptr);
	}

}
