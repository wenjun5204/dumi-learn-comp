import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => <div>

    <span> 你们的亲 你改一下试试</span>
    <h4>{props.title}</h4>
</div>;

export default Foo;
