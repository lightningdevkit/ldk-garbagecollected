package org.ldk.impl.ln.peer_handler;

import org.ldk.impl.bindings;

public class PeerManager {
    private final long c_obj;

    private PeerManager(long c_obj) {
        this.c_obj = c_obj;
    }
    //public PeerManager(MessageHandler)

    @SuppressWarnings("deprecation")
    @Override
    final protected void finalize() throws Throwable {
        bindings.PeerManager_free(this.c_obj);
        super.finalize();
    }
}
