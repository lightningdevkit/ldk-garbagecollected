
            export enum ConfirmationTarget {
                /**
 * We are happy with this transaction confirming slowly when feerate drops some.
 */
LDKConfirmationTarget_Background,
				/**
 * We'd like this transaction to confirm without major delay, but 12-18 blocks is fine.
 */
LDKConfirmationTarget_Normal,
				/**
 * We'd like this transaction to confirm in the next few blocks.
 */
LDKConfirmationTarget_HighPriority,
				
            }
