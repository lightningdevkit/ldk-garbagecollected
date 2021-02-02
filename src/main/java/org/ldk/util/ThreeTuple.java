package org.ldk.util;

public class ThreeTuple<A, B, C> {
    private Runnable finalize_run;
    public A a;
    public B b;
    public C c;
    public ThreeTuple(A a, B b, C c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    public ThreeTuple(A a, B b, C c, Runnable finalize_run) {
        this(a, b, c);
        this.finalize_run = finalize_run;
    }
    @Override
    public void finalize() throws Throwable {
        if (finalize_run != null) finalize_run.run();
        super.finalize();
    }
}
