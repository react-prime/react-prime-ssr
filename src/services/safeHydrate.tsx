import { isServer } from './isServer';

export const SafeHydrate: React.FC = (props) => {
  return (
    /**
     * Rendering null on the server and not on the client will produce a hydration mismatch warning.
     * Since it's expected in this case, we can supress the warning.
     */
    <div suppressHydrationWarning>
      {isServer ? null : props.children}
    </div>
  );
};
