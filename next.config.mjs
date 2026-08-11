import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monssfmn.next.erxes.io", // танай erxes instance-ийн домэйн
      },
    ],
  },
  env: {
    ERXES_API_URL: "https://monssfmn.next.erxes.io/gateway/graphql",
    ERXES_URL: "https://monssfmn.next.erxes.io/gateway",
    ERXES_FILE_URL: "https://monssfmn.next.erxes.io/gateway/read-file?key=", // updated to match the domain
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IlhhdnhDc21kWUNtMFk0OHRNLVZ4bCIsImlhdCI6MTc3MjYyODkxOX0.B5BVTSWfkTW1jpiVqfDfkkoesieAfYZNX6xCTc9fejg", // your copied token earlier
    // erxes Forms (registration). Fill from erxes admin → Forms/Leads →
    // your registration form: the form id and its brand id.
    ERXES_FORM_ID: "",
    ERXES_BRAND_ID: "",
    // erxes Forms — "contact" form. Create a form named "contact" in erxes
    // admin and set it to convert submissions into a Ticket, then paste its
    // form id + brand id here. Submissions then appear in the ticket board.
    ERXES_CONTACT_FORM_ID: "",
    ERXES_CONTACT_BRAND_ID: "",
    // erxes client-portal ticket board (frontline:ticket). The contact form
    // creates a ticket here via cpCreateTicket. Grab these IDs from your
    // ticket board in erxes admin (Tickets pipeline → stage).
    ERXES_TICKET_CHANNEL_ID: "",
    ERXES_TICKET_PIPELINE_ID: "",
    ERXES_TICKET_STAGE_ID: "",
    ERXES_TICKET_STATUS_ID: "",
  },
};

export default withNextIntl(nextConfig);
