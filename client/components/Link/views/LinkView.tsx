/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Link.views
 */

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react";
// import clsx from "clsx";
// import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

interface LinkPropsBase {
  // activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, "href">;

const uriHack = (uri: string, hasSlash?: boolean) => {
  const [pathname, qs] = String(uri).split("?", 2);
  const query = qs ? `?${qs}` : "";
  return pathname !== "/"
    ? String(pathname).replace(/\/$/, hasSlash ? "/" : "") + query
    : pathname + query;
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function LinkComponent(props: LinkProps) {
  const {
    href: pathname,
    as: asPath,
    // activeClassName = "active",
    // className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  // const router = useRouter();
  // const pathname = typeof href === "string" ? href : href.pathname;
  // const className = clsx(classNameProps, {
  //   [activeClassName]: router.pathname === pathname && activeClassName
  // });

  const href = uriHack(String(pathname));
  const as = uriHack(String(asPath || href), true);

  if (naked) {
    return (
      <NextComposed
        // className={className}
        ref={innerRef}
        href={href}
        as={as}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      // className={className}
      ref={innerRef}
      href={href as string}
      as={as}
      {...other}
    />
  );
}

/**
 * Material UI 의 링크와 Next.js 의 링크의 기능을 통합한 컴포넌트입니다.
 */
export const LinkView = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkComponent {...props} innerRef={ref} />
);
