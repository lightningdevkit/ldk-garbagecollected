
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export class Logger extends CommonBase {

                bindings_instance?: bindings.LDKLogger;

                constructor(ptr?: number, arg?: bindings.LDKLogger) {
                    if (Number.isFinite(ptr)) {
				        super(ptr);
				        this.bindings_instance = null;
				    } else {
				        // TODO: private constructor instantiation
				        super(bindings.LDKLogger_new(arg));
				        this.ptrs_to.push(arg);
				        
				    }
                }

                protected finalize() {
                    if (this.ptr != 0) {
                        bindings.Logger_free(this.ptr);
                    }
                    super.finalize();
                }

                static new_impl(arg: LoggerInterface): Logger {
                    const impl_holder: LDKLoggerHolder = new LDKLoggerHolder();
                    let structImplementation = <bindings.LDKLogger>{
                        // todo: in-line interface filling
                        log (record: String): void {
							arg.log(record);
						},

						
                    };
                    impl_holder.held = new Logger (null, structImplementation);
                }
            }

            export interface LoggerInterface {
                log(record: String): void;
				
            }

            class LDKLoggerHolder {
                held: Logger;
            }
}
