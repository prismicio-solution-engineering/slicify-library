import { Client, Content } from "@prismicio/client";

/**
 * Returns an array of document metadata containing each language a document has
 * been translated into.
 *
 * A `lang_name` property is included in each document containing the document's
 * language name as it is configured in the Prismic repository.
 *
 */
export async function getLanguages(
  doc: Content.AllDocumentTypes,
  client: Client<Content.AllDocumentTypes>,
  locales?: string[]
) {
  if (locales && locales.length > 1) {
    const [altDocs] = await Promise.all([
      doc.alternate_languages.length > 0
        ? client.getAllByIDs(
            doc.alternate_languages.map((altLang) => altLang.id),
            {
              lang: "*",
              // Exclude all fields to speed up the query.
              fetch: `${doc.type}.__nonexistent-field__`,
            }
          )
        : Promise.resolve([]),
    ]);

    //PLace current locale in first position
    locales = locales.filter((lang) => lang !== doc.lang);
    locales.unshift(doc.lang);

    return locales.map((lang) => {
      return {
        url:
          [doc, ...altDocs].find((doc) => lang === doc.lang)?.url || `/${lang}`,
        lang_name: lang,
      };
    });
  }
  return [{url: doc.url || `/${doc.lang}`, lang_name: doc.lang}];
}
