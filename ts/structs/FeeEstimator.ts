	public int get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target) {
		int ret = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		return ret;
	}

}
