"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for small personal projects",
    features: [
      "5 Projects",
      "1GB Storage",
      "Free Subdomain",
      "Basic Analytics",
      "Community Support"
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "15",
    description: "For developers and small teams",
    features: [
      "Unlimited Projects",
      "10GB Storage",
      "Custom Domains",
      "Advanced Analytics",
      "Priority Support",
      "GitHub Integration",
      "Faster IPFS Gateway"
    ],
    highlighted: true,
    cta: "Upgrade to Pro"
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For businesses and large teams",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Custom Domains",
      "Advanced Analytics",
      "24/7 Support",
      "GitHub & GitLab Integration",
      "Premium IPFS Gateway",
      "Team Management",
      "Custom Branding"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export function PricingSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your needs. All plans include decentralized hosting.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${
                plan.highlighted 
                  ? 'border-primary shadow-lg relative overflow-hidden' 
                  : 'border bg-card/50'
              }`}>
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.highlighted ? '' : 'bg-card hover:bg-card/80'}`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}