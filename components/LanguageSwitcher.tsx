'use client'
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export function LanguageSwitcher(props: {
  languages: {
    url: string;
    lang_name: string;
  }[];
}) {

  const router = useRouter();
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    //Handle language redirects through the header language switch
    const newVersion = props.languages.find(
      (version) => version.lang_name === event.target.value
    );
    if (!newVersion) {
      //Redirect to 404 if alternative version does not exist
      router.push("/404");
    } else {
      router.push(newVersion.url);
    }
  }

  return (
    //Only added on desktop for now
    <div className="ml-auto flex items-center">
      <div className="hidden lg:ml-8 lg:flex">
        <a className="text-gray-700 hover:text-gray-800 flex items-center">
          <select
            id="location"
            name="location"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm rounded-md"
            onChange={handleChange}
            value={props.languages[0].lang_name}
          >
            {props.languages?.map((locale) => {
              return <option key={locale.lang_name}>{locale.lang_name}</option>;
            })}
          </select>
        </a>
      </div>
    </div>
  );
}
