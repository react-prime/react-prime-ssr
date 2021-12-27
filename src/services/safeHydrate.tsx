import { isServer } from './isServer';

export const SafeHydrate: React.FC = (props) => {
  console.log({ isServer });

  return (
    <div suppressHydrationWarning>
      {isServer ? null : props.children}
    </div>
  );
};
