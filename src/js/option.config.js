const option = {
    chanellLimit: 255,

    percentHalf: 62,
    percentMaximum: 100,

    shapesAmount: 262,

    animationInterval: 618,
    animationShapeQuery: '.colorize',
    animationAreaQuery: '#animationArea',

    buttonAreaQuery: '#buttonArea',

    rootElement: 'body',

    blendingModeList: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity'
    ],

    blendingModeDefault: 15
}

module.exports = option;
