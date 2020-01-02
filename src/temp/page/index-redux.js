
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