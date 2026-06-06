import React from 'react';

const Hooks = () => {
  return (
    <div>hooks</div>
  );
};

export default Hooks;

export function withHooks<P>(WrappedComponent: React.ComponentType<P>) {
  return function WithHooks(props: P) {
    return (
      <>
        <Hooks />
        <WrappedComponent {...props} />
      </>
    );
  };
}
