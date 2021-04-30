import * as i from 'types';
import React from 'react';
import _ from 'lodash';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export const Link: React.FC<LinkProps> = ({
  children, className, to, ariaLabel, currentTab, type, disabled, ...props
}) => {
  const formattedAriaLabel = _.capitalize(ariaLabel);
  const isExternalUrl = !to.startsWith('/');

  let linkProps: React.AnchorHTMLAttributes<Element> = {
    className: className || '',
  };

  if (isExternalUrl || type !== 'route') {
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

    return (
      <a {...linkProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={to}>
      {React.Children.only(
        <a {...linkProps} {...props}>
          {children}
        </a>,
      )}
    </NextLink>
  );
};

type LinkProps = React.AnchorHTMLAttributes<Element> & Omit<NextLinkProps, 'href'> & {
  children: React.ReactNode;
  to: i.Routes | `http${string}`;
  className?: string;
  ariaLabel?: string;
  currentTab?: boolean;
  type?: 'route' | 'text' | 'mail' | 'phone';
  disabled?: boolean;
};

Link.defaultProps = {
  type: 'route',
};
