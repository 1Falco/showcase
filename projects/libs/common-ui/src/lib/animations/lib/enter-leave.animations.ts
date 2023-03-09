import { animate, animation, group, query, sequence, style } from "@angular/animations";

export const enterFromLeft = animation([
    style({ position: 'relative' }),
    query(':enter', style({ transform: 'translateX(150%)' })),
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
    // animate the leave page away
    group([
        query(':leave', [
            animate('0.45s cubic-bezier(.45,0,.25,1)', style({ transform: 'translateX(-150%)', opacity: 0 })),
        ]),
        // and now reveal the enter
        query(':enter', animate('0.45s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)', opacity: 1 }))),
    ]),

]);

export const leaveToRight = animation([
    style({ position: 'relative' }),
    query(':enter', style({ transform: 'translateX(-150%)' })),
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
    // animate the leave page away
    group([
        query(':leave', [
            animate('0.45s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(150%)' })),
        ]),
        // and now reveal the enter
        query(':enter', animate('0.45s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
    ]),
]);


export const enterTopAnimation = animation([
    style({ height: '*', opacity: '0', transform: 'translateY(-500px)', 'box-shadow': 'none' }),
    sequence([
        animate('.5s ease', style({ height: '*', opacity: '.2', transform: 'translateY(0)', 'box-shadow': 'none' })),
        animate('.5s ease', style({ height: '*', opacity: 1, transform: 'translateY(0)' }))
    ])
]);
export const leaveTopAnimation = animation([
    style({ height: '*', opacity: 1, transform: 'translateY(0)', 'box-shadow': 'none' }),
    sequence([
        animate('.5s ease', style({ height: '*', opacity: 1, transform: 'translateY(-500px)' })),
        animate('.5s ease', style({ height: '*', opacity: .2, transform: 'translateY(-500px)', 'box-shadow': 'none' }))
    ])
]);