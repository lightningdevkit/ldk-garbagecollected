package org.ldk.impl.ln.peer_handler;

import org.ldk.impl.bindings;
import org.ldk.impl.ln.msgs.ChannelMessageHandler;
import org.ldk.impl.ln.msgs.RoutingMessageHandler;

public class MessageHandler {
    private final long c_obj;
    // We don't care about these, but we hold references to them to ensure they don't get free'd before us
    private final ChannelMessageHandler chan_handler;
    private final RoutingMessageHandler route_handler;

    //oc    Pr  Bprivate MessageHandler(long c_obj) { this.c_obj = c_obj; }
    public MessageHandler(ChannelMessageHandler chan_handler, RoutingMessageHandler route_handler) {
        this.c_obj = bindings.MessageHandler_new(chan_handler.getC_obj(), route_handler.getC_obj());
        this.chan_handler = chan_handler;
        this.route_handler = route_handler;
    }

    @SuppressWarnings("deprecation")
    @Override
    final protected void finalize() throws Throwable {
        bindings.MessageHandler_free(this.c_obj);
        super.finalize();
    }
}