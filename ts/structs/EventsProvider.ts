
            
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
                        get_and_clear_pending_events (): number[] {
							Event[] ret = arg.get_and_clear_pending_events();
				result: number[] = Arrays.stream(ret).map(arr_conv_7 -> arr_conv_7.ptr).toArray(number[]::new);
				/* TODO 2 Event  */;
				return result;
						},

						
                    };
                    impl_holder.held = new EventsProvider (null, structImplementation);
                }
            }

            export interface EventsProviderInterface {
                get_and_clear_pending_events(): Event[];
				
            }

            class LDKEventsProviderHolder {
                held: EventsProvider;
            }
	public Event[] get_and_clear_pending_events() {
		number[] ret = bindings.EventsProvider_get_and_clear_pending_events(this.ptr);
		Event[] arr_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			number arr_conv_7 = ret[h];
			Event arr_conv_7_hu_conv = Event.constr_from_ptr(arr_conv_7);
			arr_conv_7_hu_conv.ptrs_to.add(this);
			arr_conv_7_arr[h] = arr_conv_7_hu_conv;
		}
		return arr_conv_7_arr;
	}

}
