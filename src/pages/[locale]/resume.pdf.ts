import type { APIRoute, GetStaticPaths } from "astro";
import { ui } from "../../i18n/ui";

export const getStaticPaths = (() => {
  return Object.keys(ui).map((lang) => ({
    params: {
      locale: lang,
    },
  }));
}) satisfies GetStaticPaths;

export const prerender = true;

export const GET: APIRoute = ({ params, request }) => {
  return new Response("TODO:IMPLEMENT");
};
