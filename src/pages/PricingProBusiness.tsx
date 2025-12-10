import { PricingTierTemplate } from "@/components/templates/PricingTierTemplate";
import { pricingData } from "@/data/pricing";

export default function PricingProBusiness() {
    return <PricingTierTemplate data={pricingData.pro} />;
}
