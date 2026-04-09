export function buildLinks(base: string, token?: string) {
  const review = token ? `${base}?token=${token}` : base;
  const advisor = token ? `${base}?token=${token}&stage=advisor` : `${base}?stage=advisor`;
  return { review, advisor };
}

export function buildAdvisorEmail(link: string) {
  return {
    subject: "Review this investment opportunity",
    body: `Hi,

I'd like you to review this investment opportunity:

${link}

Let me know your thoughts.

- Shari`
  };
}
