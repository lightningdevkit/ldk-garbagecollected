package org.ldk.impl.chain.chaininterface;

public interface BroadcasterInterface {
    public void broadcast_transaction(byte[] transaction_data);
}
