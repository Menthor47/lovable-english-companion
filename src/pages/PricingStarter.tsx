import { PricingTierTemplate } from "@/components/templates/PricingTierTemplate";
import { pricingData } from "@/data/pricing";

export default function PricingStarter() {
    return <PricingTierTemplate data={pricingData.starter} />;
}
