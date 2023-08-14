
const _SETTINGS = {
    styleTagSelector: "data-webplatform-scaleroot",
    styleHeightTagSelector: "data-webplatform-scaleroot-height",
    el: {
        fullpage: '.fullpage',
        wrapper: '#wrapper',
        scaleDesktop: '.scaleDesktop',
        scaleMobile: '.scaleMobile',
        fixDeviceHeight: '.fixDeviceHeight',
        maxDeviceHeight: '.maxDeviceHeight',
        fancyboxContainer: '.fancybox-container'
    },
    designWidth: {
        desktop: 2000,
        mobile: 768
    },
    styleVariables: {
        scaleRatio: '--scale-ratio',
        deviceHeight: '--device-height'
    },
    data: {
        scaleRatio: 'data-scale-ratio',
        deviceType: 'data-device-type',
        originDesktop: 'data-origin-desktop',
        originMobile: 'data-origin-mobile'
    },
    isMobile: () => {
        const windowWidth = $(window).width(),
            windowHeight = $(window).height();
        return (windowWidth <= windowHeight && windowWidth < 999);
    },
    viewportWidth: () => $("body").outerWidth(), 
    callback(){}
}


var DATA = {
    scaleRatio: 1,
    deviceType: 'desktop'
}

const scaleRoot = {
    removeGlobalStyle: (sets) => {
        if ($(`[${sets.styleTagSelector}]`).length > 0) {
            $(`[${sets.styleTagSelector}]`).remove();
        }
        if ($(`[${sets.styleHeightTagSelector}]`).length > 0) {
            $(`[${sets.styleHeightTagSelector}]`).remove();
        }
        return true;
    },
    removeGlobalHeightStyle: (sets) => {
        if ($(`[${sets.styleHeightTagSelector}]`).length > 0) {
            $(`[${sets.styleHeightTagSelector}]`).remove();
        }
        return true;
    },
    // removeGlobalData: (settings) => {
    //     Object.entries(settings.globalData).forEach(([_, data]) => {
    //         $("")
    //     });
    //     return true;
    // },
    calcScaleRatio: (settings, deviceWidth) => settings.isMobile()
            ? deviceWidth / settings.designWidth.mobile
            : deviceWidth / settings.designWidth.desktop,
    addGlobalStyle(settings, data){ 
        var globalStyleContent = '',
            globalVarsContent = '';

        // console.log(data.scaleRatio, data.deviceType);

        // set globalData
        $(`${settings.el.fullpage}`).attr(settings.data.scaleRatio, data.scaleRatio);
        $(`${settings.el.fullpage}`).attr(settings.data.deviceType, data.deviceType); 

        // set globalStyle 
        if (settings.isMobile()) {
            globalStyleContent += `
/* globalStyle */
${settings.el.scaleMobile} {
    scale: ${data.scaleRatio};
    /*transform: scale(${data.scaleRatio});*/
    transform-origin: top left;
}
`;
        } else {
            globalStyleContent += `
/* globalStyle */
${settings.el.scaleDesktop} {
    scale: ${data.scaleRatio};
    /*transform: scale(${data.scaleRatio});*/
    transform-origin: top left;
}
            `;
        }

//         globalStyleContent += `
// ${settings.el.fancyboxContainer} { 
//     scale: ${data.scaleRatio};
//     /*transform: scale(${data.scaleRatio});*/
//     transform-origin: top left;
// }
//         `

        // device height
        var deviceHeight = "calc(100vh * " + 1 / data.scaleRatio + ")";
        globalStyleContent += `
/* device height */
${settings.el.fixDeviceHeight} {
    height: ${deviceHeight};
}
${settings.el.maxDeviceHeight} {
    max-height: ${deviceHeight}
}
        `

        // styleVariables
        globalVarsContent += `
    ${settings.styleVariables.scaleRatio}: ${data.scaleRatio};
    ${settings.styleVariables.deviceHeight}: ${deviceHeight};
        `;
        
        // set el extra attributes 
        if (settings.isMobile()) {
globalStyleContent += `
/* el extra attributes  */
[${settings.data.originMobile}='left top'],
[${settings.data.originMobile}='top left'] {
transform-origin: top left;
}
[${settings.data.originMobile}='right top'],
[${settings.data.originMobile}='top right'] {
transform-origin: top right;
}
[${settings.data.originMobile}='left bottom'],
[${settings.data.originMobile}='bottom left'] {
transform-origin: bottom left;
}
[${settings.data.originMobile}='right bottom'],
[${settings.data.originMobile}='bottom right'] {
transform-origin: bottom right;
}
[${settings.data.originMobile}='center center'] {
transform-origin: center center;
}
[${settings.data.originMobile}='center top'],
[${settings.data.originMobile}='top center'] {
    transform-origin: top center;
}
[${settings.data.originMobile}='center bottom'],
[${settings.data.originMobile}='bottom center'] {
    transform-origin: bottom center;
}
        `;
        } else {
            globalStyleContent += `
/* el extra attributes  */
[${settings.data.originDesktop}='left top'],
[${settings.data.originDesktop}='top left'] {
    transform-origin: top left;
}
[${settings.data.originDesktop}='right top'],
[${settings.data.originDesktop}='top right'] {
    transform-origin: top right;
}
[${settings.data.originDesktop}='left bottom'],
[${settings.data.originDesktop}='bottom left'] {
    transform-origin: bottom left;
}
[${settings.data.originDesktop}='right bottom'],
[${settings.data.originDesktop}='bottom right'] {
    transform-origin: bottom right;
}
[${settings.data.originDesktop}='center center'] {
    transform-origin: center center;
}
[${settings.data.originDesktop}='center top'],
[${settings.data.originDesktop}='top center'] {
    transform-origin: top center;
}
[${settings.data.originDesktop}='center bottom'],
[${settings.data.originDesktop}='bottom center'] {
    transform-origin: bottom center;
}
        `;
        }


        $("head").append(`
<style ${settings.styleTagSelector} type="text/css">
${globalStyleContent}
:root {
    ${globalVarsContent}
}
</style>
        `);
    },
    rescaleParent(settings = _SETTINGS, data = DATA){      
        // console.log("RESCALED")
        $(`[${settings.styleHeightTagSelector}]`).empty();
        // rescaleParent 
        var rescaleHeight = $(`${settings.el.wrapper}`).outerHeight() * data.scaleRatio;
        var heightTagContent = `
/* rescaleParent */
${settings.el.fullpage} { 
    height: ${rescaleHeight}px;
    min-height: 100vh;
}
        `;

        if ($(`[${settings.styleHeightTagSelector}]`).length > 0) {
            $(`[${settings.styleHeightTagSelector}]`).append(heightTagContent);
        } else {
            
            $("head").append(`
                <style ${settings.styleHeightTagSelector} type="text/css">
                    ${heightTagContent}
                </style> 
            `);

            window.parent.postMessage({
                type: 'RESCALED_HEIGHT',
            }, '*');
        };

    }
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM is ready
    // console.log('DOMContentLoaded');
    // console.log($("body").length);  

    // console.log(_SETTINGS.viewportWidth());
    
    // Reset global style
    scaleRoot.removeGlobalStyle(_SETTINGS);

    DATA.deviceType = _SETTINGS.isMobile() ? 'mobile' : 'desktop';
    DATA.scaleRatio = scaleRoot.calcScaleRatio(_SETTINGS, _SETTINGS.viewportWidth());
    // console.log(DATA.scaleRatio); 

    // Add global style
    scaleRoot.addGlobalStyle(_SETTINGS, DATA);
    // scaleRoot.rescaleParent(_SETTINGS, DATA);
    _SETTINGS.callback(); 
});

window.addEventListener('load', function() {
    // window is loaded 
    // console.log('load');

    // Rescale fullpage's height
    DATA.deviceType = _SETTINGS.isMobile() ? 'mobile' : 'desktop';
    DATA.scaleRatio = scaleRoot.calcScaleRatio(_SETTINGS, _SETTINGS.viewportWidth());
    // console.log(DATA.scaleRatio); 

    // Add global style
    scaleRoot.rescaleParent(_SETTINGS, DATA);

});

window.addEventListener('resize', function() {
    // window is resized
    // console.log('resize');

    // Reset global style
    scaleRoot.removeGlobalStyle(_SETTINGS);

    DATA.deviceType = _SETTINGS.isMobile() ? 'mobile' : 'desktop',
    DATA.scaleRatio = scaleRoot.calcScaleRatio(_SETTINGS, _SETTINGS.viewportWidth()),

    // Add global style
    scaleRoot.addGlobalStyle(_SETTINGS, DATA);
    scaleRoot.rescaleParent(_SETTINGS, DATA);
    _SETTINGS.callback();

});

window.addEventListener("message", function(event) {
    if (['ALL_IMPORTED', 'RESCALE_PARENT'].indexOf(event.data.type) > -1) {
        // console.log(event.data.type);
        // console.log(event.data.data);
        scaleRoot.rescaleParent(_SETTINGS, DATA);
    }
}, false);