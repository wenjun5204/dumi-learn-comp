import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => <div>

    <span> 你们的亲</span>
    <h4>{props.title}</h4>
</div>;

export default Foo;
