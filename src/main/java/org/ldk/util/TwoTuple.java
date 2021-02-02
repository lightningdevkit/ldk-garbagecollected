package org.ldk.util;

public class TwoTuple<A, B> {
    private Runnable finalize_run;
    public A a;
    public B b;
    public TwoTuple(A a, B b) {
        this.a = a;
        this.b = b;
    }
    public TwoTuple(A a, B b, Runnable finalize_run) {
        this(a, b);
        this.finalize_run = finalize_run;
    }
    @Override
    public void finalize() throws Throwable {
        if (finalize_run != null) finalize_run.run();
        super.finalize();
    }
}
