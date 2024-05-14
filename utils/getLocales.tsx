import { createClient } from "@/prismicio";

export const getLocales = async () => {
  const client = createClient();
  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return locales;
};
