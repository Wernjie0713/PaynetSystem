import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img src="/images/Logo2.png" alt="Logo" width="w-max" height="h-max" {...props} />
    );
}
