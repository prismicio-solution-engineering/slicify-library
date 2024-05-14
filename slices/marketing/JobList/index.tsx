import { Container } from "@/components/Container";
import { fetchJobOpenings } from "@/utils/getJobList";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `JobList`.
 */
export type JobListProps = SliceComponentProps<Content.JobListSlice>;

/**
 * Component for "JobList" Slices.
 */
const JobList = async ({ slice }: JobListProps): Promise<JSX.Element> => {

  const jobOpenings = await fetchJobOpenings();

  return (
    <section id={slice.primary.anchor || undefined}>
      <Container className="relative isolate overflow-hidden px-6 py-16 sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                    {children}
                  </h2>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-4 text-lg tracking-tight text-slate-700">
                    {children}
                  </p>
                ),
              }}
            />
            <PrismicNextImage
              className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
              field={slice.primary.image}
            />
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="sr-only">Job openings</h3>
            <ul className="-my-8 divide-y divide-gray-100">
              {jobOpenings.map((opening: { id: string | undefined; position: string | undefined; team: string | undefined; location: string | undefined; }) => (
                <li key={opening.id} className="py-8">
                  <dl className="relative flex flex-wrap gap-x-3">
                    <dt className="sr-only">Position</dt>
                    <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                      <a href="#">
                        {opening.position}
                        <span className="absolute inset-0" aria-hidden="true" />
                      </a>
                    </dd>
                    <dt className="sr-only">Team</dt>
                    <dd className="mt-4 text-base font-semibold leading-7 text-gray-900">
                      {opening.team}
                    </dd>
                    <dt className="sr-only">Location</dt>
                    <dd className="mt-4 flex items-center gap-x-1 text-base leading-7 text-light-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {opening.location}
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex border-t border-gray-100 pt-8">
              <PrismicNextLink
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                field={slice.primary.link}
              >
                {slice.primary.link_text} <span aria-hidden="true">&rarr;</span>
              </PrismicNextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JobList;
