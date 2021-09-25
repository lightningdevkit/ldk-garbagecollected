
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class IgnoringMessageHandler extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.IgnoringMessageHandler_free(this.ptr);
                    }
                }
	public static IgnoringMessageHandler constructor_new() {
		number ret = bindings.IgnoringMessageHandler_new();
		const ret_hu_conv: IgnoringMessageHandler = new IgnoringMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		number ret = bindings.IgnoringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		number ret = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public CustomMessageReader as_CustomMessageReader() {
		number ret = bindings.IgnoringMessageHandler_as_CustomMessageReader(this.ptr);
		CustomMessageReader ret_hu_conv = new CustomMessageReader(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public CustomMessageHandler as_CustomMessageHandler() {
		number ret = bindings.IgnoringMessageHandler_as_CustomMessageHandler(this.ptr);
		CustomMessageHandler ret_hu_conv = new CustomMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
