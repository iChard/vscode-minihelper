const xml = `
<view class="">
    compnent
</view>
`;

const compJson = `
{
    "component": true,
    "usingComponents": {
        
    }
}

`;

const pageJson = `
{
    
}
`;
const css = `
`;

const compJs = `

Component({
    mixins: [],
    data: {
        
    },
    props: {
    },
    didMount() { },
    didUpdate() { },
    didUnmount() { },
    methods: {
        
    },
});

`;

const compJsRedux = `

const pageConfig = {
    mixins: [],
    data: {

    },
    props: {
    },
    didMount() { },
    didUpdate() { },
    didUnmount() { },
    methods: {

    },
};

const mapStateToData = state => ({
})

const mapDispatchToPage = dispath => ({

})
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);
`;

const pageJs = `

Pages({
    data: {
    },
    onLoad() {
    },

    onShow() {

    },
    onUnload() {

    }
});

`;

const pageJsRedux = `

const pageConfig = {
    data: {
    },
    onLoad() {
    },

    onShow() {

    },
    onUnload() {

    }
};

const mapStateToData = state => ({
})

const mapDispatchToPage = dispath => ({

})
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);
`;

export default {
    xml,
    css,
    compJs,
    compJson,
    compJsRedux,
    pageJs,
    pageJson,
    pageJsRedux
};