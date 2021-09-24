
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class Balance extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.Balance_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): Balance {
		const raw_val: bindings.LDKBalance = bindings.LDKBalance_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKBalance.ClaimableOnChannelClose) {
			return new ClaimableOnChannelClose(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKBalance.ClaimableAwaitingConfirmations) {
			return new ClaimableAwaitingConfirmations(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKBalance.ContentiousClaimable) {
			return new ContentiousClaimable(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKBalance.MaybeClaimableHTLCAwaitingTimeout) {
			return new MaybeClaimableHTLCAwaitingTimeout(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class ClaimableOnChannelClose extends Balance {
	public claimable_amount_satoshis: number;
	private constructor(ptr: number, obj: bindings.LDKBalance.ClaimableOnChannelClose) {
		super(null, ptr);
		this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
	}
}
export class ClaimableAwaitingConfirmations extends Balance {
	public claimable_amount_satoshis: number;
	public confirmation_height: number;
	private constructor(ptr: number, obj: bindings.LDKBalance.ClaimableAwaitingConfirmations) {
		super(null, ptr);
		this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
		this.confirmation_height = obj.confirmation_height;
	}
}
export class ContentiousClaimable extends Balance {
	public claimable_amount_satoshis: number;
	public timeout_height: number;
	private constructor(ptr: number, obj: bindings.LDKBalance.ContentiousClaimable) {
		super(null, ptr);
		this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
		this.timeout_height = obj.timeout_height;
	}
}
export class MaybeClaimableHTLCAwaitingTimeout extends Balance {
	public claimable_amount_satoshis: number;
	public claimable_height: number;
	private constructor(ptr: number, obj: bindings.LDKBalance.MaybeClaimableHTLCAwaitingTimeout) {
		super(null, ptr);
		this.claimable_amount_satoshis = obj.claimable_amount_satoshis;
		this.claimable_height = obj.claimable_height;
	}
}
	public Balance clone() {
		number ret = bindings.Balance_clone(this.ptr);
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Balance constructor_claimable_on_channel_close(number claimable_amount_satoshis) {
		number ret = bindings.Balance_claimable_on_channel_close(claimable_amount_satoshis);
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Balance constructor_claimable_awaiting_confirmations(number claimable_amount_satoshis, number confirmation_height) {
		number ret = bindings.Balance_claimable_awaiting_confirmations(claimable_amount_satoshis, confirmation_height);
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Balance constructor_contentious_claimable(number claimable_amount_satoshis, number timeout_height) {
		number ret = bindings.Balance_contentious_claimable(claimable_amount_satoshis, timeout_height);
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Balance constructor_maybe_claimable_htlcawaiting_timeout(number claimable_amount_satoshis, number claimable_height) {
		number ret = bindings.Balance_maybe_claimable_htlcawaiting_timeout(claimable_amount_satoshis, claimable_height);
		Balance ret_hu_conv = Balance.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean eq(Balance b) {
		boolean ret = bindings.Balance_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
