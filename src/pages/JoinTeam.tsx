import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap, Crown, Flame } from "lucide-react";
import { toast } from "sonner";

const JoinTeam = () => {
  const subscriptionPlans = [
    {
      name: "Monthly",
      price: "₹499",
      period: "/month",
      icon: Zap,
      features: [
        "Full access to fielding",
        "Priority booking",
        "24/7 support",
        "Cancel anytime"
      ]
    },
    {
      name: "Quarterly",
      price: "₹1299",
      period: "/3 months",
      icon: Crown,
      popular: true,
      features: [
        "Everything in Monthly",
        "Save ₹198",
        "VIP status",
        "Exclusive events"
      ]
    },
    {
      name: "Yearly",
      price: "₹4999",
      period: "/year",
      icon: Flame,
      features: [
        "Everything in Quarterly",
        "Save ₹1000",
        "Lifetime VIP",
        "Personal manager"
      ]
    }
  ];

  const handleSubscribe = (plan: string) => {
    toast.success(`${plan} subscription activated!`);
  };

  return (
    <div className="min-h-screen bg-deadly-darker py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-deadly-red">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-deadly-red deadly-text-glow uppercase tracking-tight">
            Join Team
          </h1>
        </div>

        <p className="text-center text-muted-foreground uppercase tracking-wider text-sm">
          Choose your poison
        </p>

        {/* Subscription Plans */}
        <div className="space-y-4">
          {subscriptionPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`bg-card border-deadly-border p-6 space-y-4 relative overflow-hidden ${
                  plan.popular ? "border-deadly-red deadly-glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-deadly-red text-foreground px-4 py-1 text-xs font-black uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="flex items-start justify-between pt-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-6 h-6 text-deadly-red" />
                      <h3 className="text-2xl font-black text-foreground uppercase tracking-wide">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-deadly-red deadly-text-glow">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 py-4">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-foreground font-bold"
                    >
                      <div className="w-1.5 h-1.5 bg-deadly-red rounded-full deadly-glow" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  variant="deadly"
                  className="w-full h-12 text-lg"
                >
                  Subscribe Now
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <Card className="bg-card border-deadly-border p-4">
          <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
            All subscriptions are auto-renewable. Cancel anytime from settings.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default JoinTeam;
