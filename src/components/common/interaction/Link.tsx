import React from 'react';
import PT from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'next/router';
import Router from 'router';
import getPageFromRoute from 'services/getPageFromRoute';

const Link = ({
  children, className, to, ariaLabel, currentTab, type, disabled, external, router, ...props
}) => {
  const formattedAriaLabel = _.capitalize(ariaLabel);

  let linkProps = {
    className: className || '',
  };

  if (external || type !== 'route') {
    const target = currentTab || type !== 'route'
      ? '_self'
      : '_blank';

    let href;

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

    const validProps = _.omit(props, 'external');

    return (
      <a {...linkProps} {...validProps}>
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

  const validProps = _.omit(props, 'params');

  return (
    <Router.Link route={to} params={props.params}>
      {React.Children.only(
        <a {...prefetchProps} {...linkProps} {...validProps}>
          {children}
        </a>,
      )}
    </Router.Link>
  );
};

Link.propTypes = {
  children: PT.string.isRequired,
  className: PT.string,
  to: PT.string.isRequired,
  ariaLabel: PT.string,
  currentTab: PT.bool,
  type: PT.oneOf(['route', 'text', 'mail', 'phone']),
  disabled: PT.bool,
  external: PT.bool,
  params: PT.object,
  router: PT.shape({
    prefetch: PT.func.isRequired,
  }).isRequired,
};

Link.defaultProps = {
  type: 'route',
};

export default withRouter(Link);
