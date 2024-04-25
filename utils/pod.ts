import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import { formatAmount } from "./utils";

export const calculateAPR = (pod: POD_INTERFACE) => {
	const _aggregatedAmount = pod.rewards.reduce((_acc, _reward) => {
		return _acc + parseFloat(formatAmount(_reward.remainingAmount.toString(), _reward.token.decimals));
	}, 0);

	if (parseInt(pod.locked.toString()) == 0) return (0).toFixed(2);

	return ((_aggregatedAmount / parseFloat(formatAmount((pod.locked || "0").toString(), pod.decimals))) * 100).toFixed(2);
};
