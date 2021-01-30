
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class LockedNetworkGraph extends CommonBase implements AutoCloseable {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                public close() {

                    if (this.ptr != 0) {
                        bindings.LockedNetworkGraph_free(this.ptr);
                    }
                }
	public NetworkGraph graph() {
		number ret = bindings.LockedNetworkGraph_graph(this.ptr);
		const ret_hu_conv: NetworkGraph = new NetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
