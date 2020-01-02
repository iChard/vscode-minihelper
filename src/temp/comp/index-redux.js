
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