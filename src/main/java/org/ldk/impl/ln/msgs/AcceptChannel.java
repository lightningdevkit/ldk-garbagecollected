package org.ldk.impl.ln.msgs;

import org.ldk.impl.bindings;

public final class AcceptChannel {
    private final long c_obj;

    private AcceptChannel(long c_obj) {
        this.c_obj = c_obj;
    }

    @SuppressWarnings("deprecation")
    @Override
    final protected void finalize() throws Throwable {
        bindings.AcceptChannel_free(this.c_obj);
        super.finalize();
    }
}
