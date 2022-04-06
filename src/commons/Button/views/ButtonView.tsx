/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import MuiButton, {ButtonProps as MuiButtonProps} from '@mui/material/Button';

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
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
        passHref={passHref}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  },
);

interface LinkPropsBase {
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiButtonProps, 'href'>;

const uriHack = (uri: string, hasSlash?: boolean) => {
  const [pathname, qs] = String(uri).split('?', 2);
  const query = qs ? `?${qs}` : '';
  return pathname !== '/'
    ? String(pathname).replace(/\/$/, hasSlash ? '/' : '') + query
    : pathname + query;
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function ButtonComponent(props: LinkProps) {
  const {href: pathname, innerRef, as: asPath, ...other} = props;

  const href = uriHack(String(pathname));
  const as = uriHack(String(asPath || href), true);

  if (!pathname) {
    <MuiButton {...other} ref={innerRef} />;
  }

  return (
    <MuiButton
      {...other}
      ref={innerRef}
      href={href as string}
      as={as}
      component={NextComposed}
    />
  );
}

/**
 * Material UI 의 버튼과 Next.js 의 버튼의 기능을 통합한 컴포넌트입니다.
 */
export const ButtonView = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <ButtonComponent {...props} innerRef={ref} />,
);
