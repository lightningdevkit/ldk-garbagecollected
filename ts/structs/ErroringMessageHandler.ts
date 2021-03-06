
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ErroringMessageHandler extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ErroringMessageHandler_free(this.ptr);
                    }
                }
	public static ErroringMessageHandler constructor_new() {
		number ret = bindings.ErroringMessageHandler_new();
		const ret_hu_conv: ErroringMessageHandler = new ErroringMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		number ret = bindings.ErroringMessageHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelMessageHandler as_ChannelMessageHandler() {
		number ret = bindings.ErroringMessageHandler_as_ChannelMessageHandler(this.ptr);
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
