
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class LockedChannelMonitor extends CommonBase implements AutoCloseable {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                public close() {

                    if (this.ptr != 0) {
                        bindings.LockedChannelMonitor_free(this.ptr);
                    }
                }
}
