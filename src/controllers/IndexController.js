const Index = {};
Index.viewIndex = (req, res) => {
    res.render('index');
}

Index.viewAbout = (req, res) => {
    res.render('about');
}

module.exports = Index;