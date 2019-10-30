import * as i from 'types';
import React from 'react';
import _ from 'lodash';
import { RouteParams } from 'next-routes';

import Router from 'router';
import { useRouter } from 'hooks';
import getPageFromRoute from 'services/getPageFromRoute';

export const Link: React.FC<LinkProps> = ({
  children, className, to, ariaLabel, currentTab, type, disabled, external, ...props
}) => {
  const router = useRouter();
  const formattedAriaLabel = _.capitalize(ariaLabel);

  let linkProps: React.AnchorHTMLAttributes<{}> = {
    className: className || '',
  };

  if (external || type !== 'route') {
    const target = currentTab || type !== 'route'
      ? '_self'
      : '_blank';

    let href: string;

    switch (type) {
      case 'mail': href = `mailto:${to}`; break;
      case 'phone': href = `tel:${to}`; break;
      default: href = to; break;
    }

    if (type !== 'text') {
      linkProps = {
        ...linkProps,
        target,
        href,
        rel: 'noopener noreferrer',
        'aria-label': formattedAriaLabel,
      };
    }

    if (type === 'text' || disabled) {
      linkProps = {
        ...linkProps,
        className: `${linkProps.className} disabled`,
      };

      return (
        <span {...linkProps} {...props}>
          {children}
        </span>
      );
    }

    const anchorProps = _.omit(props, 'external');

    return (
      <a {...linkProps} {...anchorProps}>
        {children}
      </a>
    );
  }

  // We route with route name, but prefetch with page name
  const prefetchPage = getPageFromRoute(to);
  let prefetchProps = {};

  if (prefetchPage) {
    prefetchProps = {
      onMouseOver: () => router.prefetch(prefetchPage),
    };
  }

  const anchorProps = _.omit(props, 'params');

  return (
    <Router.Link route={to} params={props.params}>
      {React.Children.only(
        <a {...prefetchProps} {...linkProps} {...anchorProps}>
          {children}
        </a>,
      )}
    </Router.Link>
  );
};

type BaseProps = React.AnchorHTMLAttributes<{}> & {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  currentTab?: boolean;
  type?: 'route' | 'text' | 'mail' | 'phone';
  disabled?: boolean;
}

/*
  If external prop is not present we can assume it's an internal link and only internal routes are
  allowed.
*/
type InternalLinkProps = {
  external?: false;
  to: i.RouteNames;
  params?: RouteParams;
}

/* If external prop is present all strings on "to" are allowed */
type ExternalLinkProps = {
  external: true;
  to: string;
  params?: never;
}

/* Combine all possible type combinations into a Discriminated Union type */
type LinkProps = BaseProps & (
  | InternalLinkProps
  | ExternalLinkProps
)

Link.defaultProps = {
  type: 'route',
  params: {},
};
