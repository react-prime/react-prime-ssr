import * as i from 'types';
import React from 'react';

import Logo from 'vectors/logo.svg';
import { fetchUser, useGetUser } from 'queries/example';
import { serverQueryFetch } from 'services';

import { PrimeHeader, PrimeContent } from 'modules/Home/styled';
import { GetServerSideProps } from 'next';

/**
 * SSR (server site rendering) dynamically renders the page on every request
 * https://www.patterns.dev/posts/server-side-rendering/
 */
const Page: i.NextPageComponent<PageProps, PageQueries> = ({ params }) => {
  const { data } = useGetUser(params.userId);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        This page is to show how to use SSR.<br /><br />
        data: <pre>{JSON.stringify(data, null, 2)}</pre>
        params: <pre>{JSON.stringify(params)}</pre>
      </PrimeContent>
    </>
  );
};

// NOTE: This function will make this path non-static. For static, use "GetStaticProps"
export const getServerSideProps: GetServerSideProps<PageProps, PageQueries> = async (ctx) => {
  const query = await serverQueryFetch(
    ['user', ctx.params!.userId],
    () => fetchUser(ctx.params!.userId),
  );

  return {
    props: {
      ...query,
      // Return more stuff from the server
      params: ctx.params!,
    },
  };
};

type PageProps = {
  params: PageQueries;
};

type PageQueries = {
  userId: string;
};

export default Page;
