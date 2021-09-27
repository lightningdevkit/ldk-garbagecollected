
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(this.ptr);
                    }
                }
}
