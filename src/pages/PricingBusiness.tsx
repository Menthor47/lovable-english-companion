import { PricingTierTemplate } from "@/components/templates/PricingTierTemplate";
import { pricingData } from "@/data/pricing";

export default function PricingBusiness() {
    return <PricingTierTemplate data={pricingData.business} />;
}
