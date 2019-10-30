import * as i from 'types';
import React from 'react';
import _ from 'lodash';
import { RouteParams } from 'next-routes';
import Router from 'router';
import getPageFromRoute from 'services/getPageFromRoute';
import useRouter from 'hooks/useRouter';

const Link: React.FC<LinkProps> = ({
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

type LinkProps = React.AnchorHTMLAttributes<{}> & {
  children: React.ReactNode;
  to: i.RouteNames;
  className?: string;
  ariaLabel?: string;
  currentTab?: boolean;
  type?: 'route' | 'text' | 'mail' | 'phone';
  disabled?: boolean;
  params?: RouteParams;
  external?: boolean;
}

Link.defaultProps = {
  type: 'route',
  params: {},
};

export default Link;
