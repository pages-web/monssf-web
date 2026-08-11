"use client";

import PageShell from "@/components/PageShell";
import ErxesEmbedForm from "@/components/ErxesEmbedForm";

/**
 * Registration page
 * -----------------
 * Renders the erxes "Бүртгэл" form (code `k-gXF1`) using the OFFICIAL erxes
 * widget (`formBundle.js`) rather than a hand-rolled renderer. The official
 * widget owns file uploads + submission, so the uploaded photos/passport files
 * land in the erxes inbox in the exact shape the CMS renders (fixing the
 * previous `n.split` error / missing image in the CMS).
 */
export default function Page() {
  return (
    <PageShell title="Бүртгэл">
      <ErxesEmbedForm formId="k-gXF1" channelId="3OymeTH7SQlGwACAHohOL" />
    </PageShell>
  );
}
