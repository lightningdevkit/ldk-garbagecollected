
            export default class CommonBase {
                ptr: number;
                ptrs_to: object[] = []; // new LinkedList(); TODO: build linked list implementation
                protected constructor(ptr: number) { this.ptr = ptr; }
                public _test_only_get_ptr(): number { return this.ptr; }
                protected finalize() {
                    // TODO: finalize myself
                }
            }
