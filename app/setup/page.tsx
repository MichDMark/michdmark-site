import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { gadgets } from "@/data/gadgets";

export const metadata = {
    title: "Setup | Mich",
    description: "The gear and software I use daily.",
};

export default function SetupPage() {
    return (
        <Container className="py-24">
            <SectionHeader
                title="Mis Gadgets"
                description="Las herramientas que uso en mi día a día y los que uso para trabajar."
                className="mb-12"
            />
            <div className="space-y-16">
                {gadgets.map((category) => (
                    <div key={category.title}>
                        <h3 className="text-xl font-bold text-white mb-6 border-l-2 border-brand-red pl-4">{category.title}</h3>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {category.items.map((item) => (
                                <div key={item.name} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <h4 className="font-bold text-zinc-100 mb-1">{item.name}</h4>
                                    <p className="text-sm text-zinc-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
