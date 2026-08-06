import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SkeletonCard } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <Section className="pt-32">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
