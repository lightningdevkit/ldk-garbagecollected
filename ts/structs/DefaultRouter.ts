
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class DefaultRouter extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.DefaultRouter_free(this.ptr);
                    }
                }
	public static DefaultRouter constructor_new(NetworkGraph network_graph, Logger logger) {
		number ret = bindings.DefaultRouter_new(network_graph == null ? 0 : network_graph.ptr & ~1, logger == null ? 0 : logger.ptr);
		const ret_hu_conv: DefaultRouter = new DefaultRouter(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(network_graph);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public Router as_Router() {
		number ret = bindings.DefaultRouter_as_Router(this.ptr);
		Router ret_hu_conv = new Router(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
